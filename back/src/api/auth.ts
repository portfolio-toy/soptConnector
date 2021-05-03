import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";

import auth from "../middlewares/auth";
import { check, validationResult } from "express-validator";

const router = express.Router();

import User from "../models/User";

/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */

//로그인 
router.post(
  "/",
  // email, password validation 확인(무조건 입력 해야 됨)
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //에러가 있다면 
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) { //db에 유저가 없는 경우 
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      // Encrpyt password
      const isMatch = await bcrypt.compare(password, user.password); // 암호화된 비번 확인 
      if (!isMatch) { // 비번이 일치하지 않는 경우 
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //jwt payload: userId저장 
        },
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 36000 }, //유효기간 
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //토큰 발급 
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//토큰 확인 미들웨어 테스트 (postman에서 어케 하는지 몰겠다)
router.get("/", auth, async function (req, res) {
    try {
      console.log(req.body.user);
      const user = await User.findById(req.body.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Err");
    }
  });

module.exports = router;
