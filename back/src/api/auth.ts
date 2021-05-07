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
      const error = validationResult(req);
      if (!error.isEmpty()) {
          res.status(400).json({ error: error.array() });
      }

      const { email, password } = req.body;

      try {
          let user = await User.findOne({ email });
          if (!user) {
              res.status(400).json({
                  errors: [{ msg: "User not exists" }],
              });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              res.status(400).json({
                  errors: [{ msg: "Password is not match" }],
              });
          }

          await user.save();        // 로그인에서 user.save가 필요한 이유?

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

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth, async function (req: Request, res: Response) {});

module.exports = router;