import express, {Request, Response} from "express";
import Profile from "../models/Profile";

import config from "../config";
import request from "request";

import auth from "../middlewares/auth";

import { check, validationResult } from "express-validator";
import { IProfileInputDto } from "../interfaces/IProfile";

const router = express.Router();

/**
 *  @route GET api/profile
 *  @desc Get all profiles
 *  @access Public
 */

//프로필 전체 조회 
router.get("/", async (req, res) => {
  try {
    //populate: User와 Profile을 하나로 묶어주는 것, User에 있는 name과 avatar 정보도 같이 find해줌 
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//유저 프로필 조회 
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

//유저의 깃허브 저장소 조회 
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
  
        res.json(JSON.parse(body)); //body부분만 parsing해서 보여주기 
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
});

  //내 프로필 조회  (동작원리를 잘 모르겠다)
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

//프로필 수정 
router.post("/", auth, 
[
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
],
async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){ // error가 있다면 
    return res.status(400).json({errors: errors.array()});
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

  //Build profile object 
  let profileFields: IProfileInputDto = {
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

  try{
    let profile = await Profile.findOne({user: user.id});

    if(profile){
      //Update
      profile = await Profile.findOneAndUpdate(
        {user: user.id},
        {$set: {value:profileFields}},
        {new: true}
      );
    }
    //Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  }catch(err){
   console.error(err.message);
   status(500).send("Server Error.");

  }

});

//경력추가 
router.put("/experience", auth,
[
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From data is required").not().isEmpty(),
],
async(req: Request, res:Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const{
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try{
    const profile = await Profile.findOne({ user: req.body.user.id });
    profile.experience.unshift(newExp); //unshift란 ?
    await profile.save();
    res.json(profile);

  }catch(error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}
)
//학력추가 
router.put("/education", auth,
[
  check("school","School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("fieldofstudy", "Field of study is required").not().isEmpty(),
],

async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try{
    const profile = await Profile.findOne({ user: req.body.user.id });
    profile.education.unshift(newEdu); 
    await profile.save();
    res.json(profile);

  }catch(error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}
)


  module.exports = router;