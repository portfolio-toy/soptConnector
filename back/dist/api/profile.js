"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_1 = __importDefault(require("request"));
const express_validator_1 = require("express-validator"); //유효성 검사
const config_1 = __importDefault(require("../config"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const Profile_1 = __importDefault(require("../models/Profile"));
const router = express_1.Router();
// router는 url을 만들어줌 실제 주소는 아니고 클라이언트가 요청하는 주소!
// 생성할거면 post(데이터를 body에 남김 -> 좀 더 안전)
// 조회(read)는 get, get은 쿼리로 넣어 어떤 값을 넣어주는지 보임!
// 업데이트는 put, patch 근데 대부분 put으로!
// 삭제는 delete
// 500이면 db에러, 404는 그냥 없는 것
/**
 *  @route GET api/profile
 *  @desc Get all profiles
 *  @access Public
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_1.default.find().populate("user", ["name", "avatar"]);
        res.json(profiles);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route GET api/profile/user/:user_id
 *  @desc Get profile by user ID
 *  @access Public
 */
router.get("/user/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({
            user: req.params.user_id,
        }).populate("user", ["name", "avatar"]);
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
        }
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route GET api/profile/github/:username
 *  @desc Get user repos from github
 *  @access Public
 */
router.get("/github/:username", (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config_1.default.githubClientId}&client_secret=${config_1.default.githubSecret}`,
            method: "GET",
            headers: { "user-agent": "node.js" },
        };
        request_1.default(options, (error, response, body) => {
            if (error)
                console.error(error);
            if (response.statusCode != 200) {
                res.status(404).json({ msg: "No github profile found" });
            }
            res.json(JSON.parse(body)); //parse는 string객체를 json객체로 변환시켜준다.
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
/**
 *  @route GET api/profile/me
 *  @desc Get current users profile
 *  @access Private
 */
router.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({
            user: req.body.user.id,
        }).populate("user", ["name", "avatar"]); //populate는 join과 같음
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route POST api/profile
 *  @desc Create or update user profile
 *  @access Private
 */
router.post("/", auth_1.default, [
    express_validator_1.check("status", "Status is required").not().isEmpty(),
    express_validator_1.check("skills", "Skills is required").not().isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, linkedin, instagram, user, } = req.body;
    // Build profile object
    let profileFields = {
        user: user.id,
    };
    if (company)
        profileFields.company = company;
    if (website)
        profileFields.website = website;
    if (location)
        profileFields.location = location;
    if (bio)
        profileFields.bio = bio;
    if (status)
        profileFields.status = status;
    if (githubusername)
        profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    // Build social object
    if (youtube)
        profileFields.social.youtube = youtube;
    if (facebook)
        profileFields.social.facebook = facebook;
    if (twitter)
        profileFields.social.twitter = twitter;
    if (linkedin)
        profileFields.social.linkedin = linkedin;
    if (instagram)
        profileFields.social.instagram = instagram;
    try {
        let profile = yield Profile_1.default.findOne({ user: user.id });
        //원래 있었는지 찾음
        if (profile) {
            // Update
            profile = yield Profile_1.default.findOneAndUpdate({ user: user.id }, { $set: { value: profileFields } }, { new: true });
            return res.json(profile); //클라에 res로 준다
        }
        // Create
        profile = new Profile_1.default(profileFields);
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        status(500).send("Server Error.");
    }
}));
/**
 *  @route PUT api/profile/experience
 *  @desc Add profile experience
 *  @access Private
 */
router.put("/experience", auth_1.default, [
    express_validator_1.check("title", "Title is required").not().isEmpty(),
    express_validator_1.check("company", "Company is required").not().isEmpty(),
    express_validator_1.check("from", "From data is required").not().isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description, } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };
    try {
        const profile = yield Profile_1.default.findOne({ user: req.body.user.id });
        profile.experience.unshift(newExp);
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route PUT api/profile/education
 *  @desc Add profile education
 *  @access Private
 */
router.put("/education", auth_1.default, //private이기때문에 미들웨어인 auth 두번째 인자 원래 request, responce 사이에 온다
[
    express_validator_1.check("school", "School is required").not().isEmpty(),
    express_validator_1.check("degree", "Degree is required").not().isEmpty(),
    express_validator_1.check("fieldofstudy", "Field of study is required").not().isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description, user, } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };
    try {
        const profile = yield Profile_1.default.findOne({ user: user.id });
        profile.education.unshift(newEdu);
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
module.exports = router;
//# sourceMappingURL=profile.js.map