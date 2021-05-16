import {Router, Request, Response} from "express";
import {check, validationResult} from "express-validator";

import auth from "../middlewares/auth";
import User from "../models/User";
import Post from "../models/Post";
import request from "request";

const router = Router();

/**
 *  @route POST api/posts
 *  @desc Create a post
 *  @access Private
 */
router.post(
  "/",
  auth,
  [check("text", "Text is request is required").not().isEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    try {
      const user = await User.findById(req.body.user.id).select("-password");
      const newPost = new Post({
        text: text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      });
      const post = await newPost.save();
      
      res.json(post);
    } catch(error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 *  @route GET api/posts
 *  @desc Get all posts
 *  @access Private
 */
router.get("/",
auth,
async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({date: -1}); // post에서 찾아서 날짜순으로 정렬 -1은 내림차순: 최신순
    res.json(posts);
  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;