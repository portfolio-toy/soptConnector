import express, { Request, Response } from "express";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import User from "../models/User";

/**
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 */
// api/users로 들어오면 user 생성.
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    //Extracts the validation errors from a request and makes them available in a Result object
    const errors = validationResult(req);
    //if have errors
    if(! errors.isEmpty()){
      return res.status(400).json()
    }

    console.log("req.body : ",req.body)
    const {name, email, password } = req.body;

    try{ 
      // See if user exists
      let user = await User.findOne({email});

      if(user){
        res.status(400).json({
          errors: [{msg : "User already exists"}]
        });
      }

      const avatar = gravatar.url(email, {
        s:"200",
        r: "pq",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      })

      //Encrpyt password -> 비밀번호 암호화
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);

      //save user
      await user.save();

      const payload = {
        user:{
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        {
          expiresIn:36000
        },
        (err, token) => {
          if(err) throw err;
          res.json({token});
        }
      );
    //try.catch
    } catch (err){
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
