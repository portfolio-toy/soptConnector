import express from "express";
import request from "request";
import Profile from "../models/Profile";
import config from "../config";
const router = express.Router();

import auth from "../middleware/auth";


/**
 *  @route GET api/profile
 *  @desc Get all profiles
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



/**
 *  @route GET api/profile/github/:username
 *  @desc Get user repos from github
 *  @access Public
 */
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
  module.exports = router;



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