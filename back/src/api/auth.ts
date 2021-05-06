import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import auth from "../middleware/auth";
import User from "../models/User";

/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors){
      return res.status(400).json({errors : result.array()})
    }

    const {email, password} = req.body;

    try{
      let user = await User.findOne({email});
      console.log(user);
      console.log(typeof(user));

      if (!user) {
        res.status(400).json({
          errors: [{msg : "Invalid Credentials"}],
        });
      }

      //Encrpyt password
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        res.status(400).json({
          errors: [{msg : "Invalid Credentials"}],
        });
      }

      // save()?
      await user.save();

      //Return jsonwebtoken
      const payload = {
        user : {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        {expiresIn : 36000},
        (err,token) =>{
          if (err) throw err;
          res.json({token});
        }
      );
    }catch(error){
      console.error(error);
      res.status(500).send("Server Error");
    }

  }
);

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth, async function (req: Request, res: Response) {
  try{
    console.log(req.body.user.id);
    const user = await User.findById(req.body.user.id).select("-password");
    res.json(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
