import express, {Request, Response} from "express";
import {check,validationResult} from "express-validator";

import auth from "../middlewares/auth";
import User from "../models/User";
import Post from "../models/Post";

import { IComment } from "../interfaces/IComment";


const router = express.Router();

//게시글 작성 
router.post("/",auth,
[check("text", "text is required").not().isEmpty()],
async(req:Request, res:Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {text} = req.body;
    try{
        const user = await User.findById(req.body.user.id).select("-password");
        const newPost = new Post({
            text: text,
            name: user.name,
            avatar: user.avatar,
            user: user.id,
        });
        const post = await newPost.save();

    }catch(err){
        res.status(500).send("Server Err");
    }
})




//모든 게시글 조회 
router.get("/",async(req: Request, res: Response) => {
    try{
        const posts = await Post.find().sort({date: -1}); //내림차순으로 Post들을 정렬해줌 
        res.json(posts);
    }catch(err){
        res.status(500).send("Server Err");
    }
});
//해당 게시글 조회 
router.get("/:id",auth,async(req: Request, res: Response) => {
    try{
        const post = await Post.findById(req.params.id);
        // const post = await Post.findOne({
        //     user: req.params.id,
        //   });

        if(!post){
            return res.status(404).json({ msg: "Post not found" });
        }
        res.json(post);

    }catch(err){
        if(err.kind === "ObjectId"){
            res.status(404).json({msg: "Post not found"});
        }           
        res.status(500).send("Server Err");
    }
})

//해당 게시글 삭제 
router.delete('/:id',auth,async(req: Request, res: Response) => {
    try{
        const post =  await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: "Post not found" });
        }

        if(post.user.toString() != req.body.user.id){
            return res.status(401).json({ msg: "User not Authorized" });
        }
    await post.remove();

    res.status(200).json({ msg: "Post Removed" });

    }catch(err){
        if(err.kind === "ObjectId"){
            return res.json(404).json({msg: "Post not found"});
        }
        res.status(500).send("Server Err");
    }
})

//좋아요누르기
router.put("/like/:id",auth,async(req:Request, res: Response) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: "Post not found" });
        }

        //이미 좋아요 눌렀는지 check   // 잘모르겠다 
        if(post.likes.filter((like) => like.user.toString() ===  req.body.user.id).length >0){
            return res.status(400).json({msg: "Post already liked"});
        }

        await post.likes.unshift({user: req.body.user.id});
        await post.save();
        res.json(post.likes);

    }catch(err){
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Err");
    }
})

//좋아요 취소 
router.put("/unlike/:id",auth,async(req:Request, res: Response) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: "Post not found" });
        }

        //이미 좋아요 눌렀는지 check  // 잘 모르겠다 
        if(post.likes.filter((like) => like.user.toString() ===  req.body.user.id).length===0){
            return res.status(400).json({msg: "Post has not yet been liked"});
        }

        const removeIndex = post.likes
        .map((like) => like.user)
        .indexOf(req.body.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);

    }catch(err){
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Err");
    }
})

//댓글 달기 
router.post("/comment/:id",auth,
[check("text", "Text is required").not().isEmpty()],
async(req:Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const user = await User.findById(req.body.user.id).select("-password");
        const post = await Post.findById(req.params.id);

        const newComment : IComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.body.user.id,
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    }catch(err){
        res.status(500).send("Server err");
    }
})

//댓글 삭제 
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
    
        if (!comment) {
            return res.status(400).json({ msg:"Comment does not exist" });
        }

        if (comment.user.toString() !== req.body.user.id) {
            return res.status(401).json({ msg: "User not Authorized" });
        } 
        
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.body.user.id);
        
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
    }catch(err){
        res.status(500).send("Server Err");
    }
})




module.exports = router;