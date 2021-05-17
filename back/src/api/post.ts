import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";

import auth from "../middlewares/auth";
import User from "../models/User";
import Post from "../models/Post";

import { IComment } from "../interfaces/IComment";

const router = Router();

/**
 *  @route POST api/posts
 *  @desc Create a post
 *  @access Private
 */
router.post(
  "/",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
    } catch (error) {
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
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 *  @route GET api/posts/:id
 *  @desc Get post by ID
 *  @access Private
 */
router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id); // 여기 req.params.id에는 url경로에 있는 :id 값이 들어옴.

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") { // ==와 ===의 차이 ==는 동등연산자, ===는 일치 연산자 ===가 더 정확하게 비교함
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 *  @route DELETE api/posts/:id
 *  @desc Delete a post
 *  @access Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.body.user.id) {
      return res.status(401).json({ msg: "User not Authorized" });
    }
    await post.remove();

    res.json({ msg: "Post Removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 *  @route PUT api/posts/like/:id
 *  @desc Like a post
 *  @access Private
 */
router.put("/like/:id",
auth,
async(req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id); //게시물의 주인을 찾아요
    if (
      post.likes.filter(like => like.user.toString() === req.body.user.id).length > 0
      // filter함수는 인자로 제공되는 함수에 의해 test를 통과한 모든 요소를 새로운 array로 만든다
      // 해당 게시물의 like유저와 req.body~를 비교 req.body~가 _id값, 즉 string이기 때문에 like.user도 toString해줌
      ) {
      return res.status(400).json({ msg: "Post already liked"});
    }
    await post.likes.unshift({ user: req.body.user.id });

    await post.save();
    res.json(post.likes);
  } catch(error) {
    console.error(error.message);
    if(error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found"});
    }
    res.status(500).send("Server Error");
  }
});

/**
 *  @route PUT api/posts/unlike/:id
 *  @desc Unlike a post
 *  @access Private
 */
router.put("/unlike/:id",
auth,
async(req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.body.user.id).length === 0
      // filter함수는 인자로 제공되는 함수에 의해 test를 통과한 모든 요소를 새로운 array로 만든다
      // 해당 게시물의 like유저와 req.body~를 비교 req.body~가 _id값, 즉 string이기 때문에 like.user도 toString해줌
      ) {
      return res.status(400).json({ msg: "Post has not yet been liked"});
    }
    const removeIndex = post.likes.map(like => like.user).indexOf(req.body.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch(error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found"});
    }
    res.status(500).send("Server Error");
  }
});

/**
 *  @route POST api/posts/comment/:id
 *  @desc Comment a post
 *  @access Private
 */
router.post("/commnet/:id",
auth,
[check("text", "Text is required").not().isEmpty()],
async(req: Request, res: Response) => {
  const errors = validationResult(req);
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment: IComment = {
      text: req.body.test,
      name: user.name,
      avatar: user.avatar,
      user: req.body.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(404).json({ errors: errors.array() });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;