<<<<<<< HEAD
import express from "express";
import Profile from "../models/Profile";
import config from "../config";
import request from 'request';
import auth from "../middleware/auth";
const router = express.Router();
=======
import { Router, Request, Response } from "express";
import request from "request";
import { check, validationResult } from "express-validator";
import config from "../config";

import auth from "../middleware/auth";
import Profile from "../models/Profile";
import { IProfileInputDTO } from "../interfaces/IProfile";

const router = Router();
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510

/**
 *  @route GET api/profile
 *  @desc Get all profiles
<<<<<<< HEAD
 *  @access Public (로그인을 하지 않아도 접근하다.) Private (로그인을 해야만 접근이 가능하다.)
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
=======
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {});

/**
 *  @route GET api/profile/user/:user_id
 *  @desc Get profile by user ID
 *  @access Public
 */
router.get("/user/:user_id", async (req: Request, res: Response) => {});
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510

/**
 *  @route GET api/profile/github/:username
 *  @desc Get user repos from github
 *  @access Public
 */
<<<<<<< HEAD
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.githubClientId}&client_secret=${config.githubSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        res.status(404).json({ msg: "No github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


/**
 *  @route GET api/profile/user/:user_id
 *  @desc Get profile by user ID
 *  @access Public
 */
router.get("/user/:user_id", async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", ["name", "avatar"]);
  
      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      if (error.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }
      res.status(500).send("Server Error");
    }
  });

/**
 *  @route GET api/profile/me
 *  @desc Get current users profile
 *  @access Private
 */
router.get("/me", auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.body.user.id,
      }).populate("user", ["name", "avatar"]);
  
      if (!profile) {
        return res.status(400).json({ msg: "There is no profile for this user" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
=======
router.get("/github/:username", (req: Request, res: Response) => {});

/**
 *  @route GET api/profile/me
 *  @desc Get current users profile
 *  @access Private
 */
router.get("/me", auth, async (req: Request, res: Response) => {});

/**
 *  @route POST api/profile
 *  @desc Create or update user profile
 *  @access Private
 */
router.post(
  "/",
  auth,
  [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {}
);

/**
 *  @route PUT api/profile/experience
 *  @desc Add profile experience
 *  @access Private
 */
router.put(
  "/experience",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From data is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {}
);

/**
 *  @route PUT api/profile/education
 *  @desc Add profile education
 *  @access Private
 */
router.put(
  "/education",
  auth,
  [
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {}
);
module.exports = router;
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
