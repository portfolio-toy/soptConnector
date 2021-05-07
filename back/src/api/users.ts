import express, { Request, Response } from "express";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";

// check 함수를 통해 request body 의 값을 검사해준다.
import { check, validationResult } from "express-validator";

const router = express.Router();

import User from "../models/User";

/** 회원가입 기능
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 */
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    // req에서 받아온 정보들 변수에 넣고, 유저정보 찾기
    const { name, email, password }= req.body;

    try{
      let user = await User.findOne({email});

      if(user){
        res.status(400).json({
          errors: [{msg: "User alreday exists"}]
        });
      }

      const avatar = gravatar.url(email,{
        s:"200",
        r: "pq",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user:{
          id:user.id,
        },
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        {expiresIn: 36000},
        (err, token)=>{
          if(err) throw err;
          res.json({ token });
        }
      );
    }catch(err){
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
