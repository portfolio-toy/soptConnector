import express from "express";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import User from "../models/User"

/**
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 */
router.post(
  "/",
  // 미들웨어
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  // 회원가입
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 에러가 있을 때
    }

    // body에서 데이터 받아오기 
    const { name, email, password } = req.body;

    try {
      // See if  user exists
      let user = await User.findOne({ email }); // user 테이블에서 해당 이메일 계정 찾기

      // 이미 있는 사용자 라면 -> 회원가입 불가능 
      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pq",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrpyt password (비밀번호 암호화)
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken (토큰 만들어서 전송)
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;