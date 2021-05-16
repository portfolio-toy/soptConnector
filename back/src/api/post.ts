import {Router, Request, Response} from "express";
import {check, validationResult} from "express-validator";

import auth from "../middlewares/auth";
import User from "../models/User";
import Post from "../models/Post";
import request, { post } from "request";

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
    if(!errors.isEmpty()) { //이 부분도 catch문에 넣기 가능! 대신 server error전에 넣는게 낫나?? -> 질문
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
//전체게시물 조회
 router.get("/",
 auth,
 async (req: Request, res: Response) => {
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
//해당 게시글 조회
router.get("/:id",
auth,
async(req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id); // 여기 req.params.id에는 url경로에 있는 :id 값이 들어옴.

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found"});
    }
    res.status(500).send("Server Error");
  }
});

/**
*  @route DELETE api/posts/:id
*  @desc Delete a post
*  @access Private
*/
// 해당 게시물 삭제
router.delete("/:id",
auth,
async(req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if(post.user.toString() !== req.body.user.id) {
      return res.status(401).json({msg: "User not Authorized"});
    }
    await post.remove();

    res.json({msg: "Post Removed"});
  } catch(error) {
    console.error(error.message);
    if(error.kind === "ObjectId") { // ==와 ===의 차이 ==는 동등연산자, ===는 일치 연산자 ===가 더 정확하게 비교함
      return res.status(404).json({msg: "Post not found"});
    }
    res.status(500).send("Server Error"); 
  }
});

module.exports = router;