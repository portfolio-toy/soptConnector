<<<<<<< HEAD
import express from "express";
=======
import express, { Request, Response } from "express";
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";
<<<<<<< HEAD
import auth from "../middleware/auth";

const router = express.Router();

=======

const router = express.Router();

import auth from "../middleware/auth";
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
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
<<<<<<< HEAD
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      // Encrpyt password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      await user.save();

      // Return jsonwebtoken
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

=======
  async (req: Request, res: Response) => {}
);

>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
<<<<<<< HEAD
router.get("/", auth, async function (req, res) {
    try {
      console.log(req.body.user.id);
      const user = await User.findById(req.body.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Err");
    }
  });
  
=======
router.get("/", auth, async function (req: Request, res: Response) {});

module.exports = router;
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
