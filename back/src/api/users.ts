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
      // 요청 유효성 확인: validationResult
      const error = validationResult(req);

      if (!error.isEmpty()) {
          res.status(400).json({ error: error.array() });
      }

      const { name, email, password } = req.body;

      try {
          // 중복 유저 확인: findOne
          let user = await User.findOne({ email });

          if (user) {
              res.status(400).json({
                  errors: [{ msg: "User already exists" }],
              });
          }

          // gravatar에서 이미지 가져오기: gravatar.url
          const avatar = gravatar.url(email, {
              s: "200", // size
              r: "pq",  // rating
              d: "mm",  // default
          });

          user = new User({
              name,
              email,
              avatar,
              password
          });

          // 비밀번호 암호화: bcrypt
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(password, salt);

          // DB에 User 저장
          await user.save();

          // jwt 토큰: payload, jwt.sign(payload, secretOrPrivateKey, [options, callback])
          // payload: 유효한 JSON을 나타냄.
          const payload = {
              user: {
                  id: user.id
              },
          };
          jwt.sign(
              payload,
              config.jwtSecret,
              { expiresIn: 36000 },
              (err, token) => {
                  if (err) throw err;   // 에러 처리는 ..? status 400 안해도되는지?
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
