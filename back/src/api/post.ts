import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import auth from "../middleware/auth";
import User from "../models/User";
import Post from "../models/Post";
import { EEXIST } from "node:constants";

const router = express.Router();

/**
 * @route POST api/posts
 * @desc Create a post
 * @access Private
 */
router.post(
  "/",
  auth,
  [
    check("text", "Text is required").not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    
    try {
      let user = await User.findById(req.body.user.id).select("-password");
      const newPost = new Post({
        text: text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
)

/**
 * @route GET api/posts
 * @desc Get all posts
 * @access Private
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route GET api/posts/:id
 * @desc Get post by ID
 * @access Private
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found"});
    }
    res.status(500).json("Server Error");
  }
});

/**
 * @route DELETE api/posts/:id
 * @desc Delete a post
 * @access Private
 */
router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.body.user.id) {
      return res.status(401).json({ msg: "User not Autorized"});
    }

    await post.remove();
    
    return res.json({ msg: "Post Removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not founnd" });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router; 