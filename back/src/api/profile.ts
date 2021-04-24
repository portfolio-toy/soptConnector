import express, { Request, Response } from "express";
const router = express.Router();
import request from "request";
import { check, validationResult } from "express-validator";

import Profile from "../models/Profile";
import { IProfileInputDTO } from "../interfaces/IProfile";
import config from "../config";
import auth from "../middleware/auth";

/**
 *  @route GET api/profile
 *  @desc Get all profiles
 *  @access Public
 */
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["user", "avartar"]);    // populate: MYSQL JOIN과 비슷한 개념
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
            return res.status(400).json({ msg: "Profile not found " });
        }
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

        // 서버에서 다른 서버에 request를 날림
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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            linkedin,
            instagram,
            user,
        } = req.body;

        // Build profile object
        let profileFields: IProfileInputDTO = {
            user: user.id,
        };
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(",").map((skill) => skill.trim());
        }

        // Build social object

        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: user.id });

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: user.id },
                    { $set: { value: profileFields } },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            status(500).send("Server Error.");
        }
    }
);

module.exports = router;