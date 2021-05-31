import { Router, Request, Response } from "express";
import request from "request";
import { check, validationResult } from "express-validator";
import config from "../config";

import auth from "../middleware/auth";
import Profile from "../models/Profile";
import { IProfileInputDTO } from "../interfaces/IProfile";

const router = Router();

/**
 *  @route GET api/profile
 *  @desc Get all profiles
 *  @access Public
 */
 router.get("/", async (req,res) => {
  try{
      const profiles = await Profile.find().populate("user",["name", "avatar"]);
      res.json(profiles);
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
router.get("/user/:user_id", async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user",["user","avatar"]);

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
 *  @route GET api/profile/github/:username
 *  @desc Get user repos from github
 *  @access Public
 */
router.get("/github/:username", (req: Request, res: Response) => {

  
});

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
