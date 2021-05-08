<<<<<<< HEAD
import express from "express";
=======
import express, { Request, Response } from "express";
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

<<<<<<< HEAD
import User from "../models/User";
import auth from "../middleware/auth";

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
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
=======
import auth from "../middleware/auth";
import User from "../models/User";
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf

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
=======
  async (req: Request, res: Response) => {
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
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

<<<<<<< HEAD
module.exports = router;
=======
/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth, async function (req: Request, res: Response) {
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Err");
  }
});

module.exports = router;
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
