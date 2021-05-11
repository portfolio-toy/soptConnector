import express, {Request, Response} from "express";
import {check,validationResult} from "express-validator";

import auth from "../middlewares/auth";
import User from "../models/User";
import Post from "../models/Post";


const router = express.Router();

//게시글 작성 


//모든 게시글 조회 
router.get("/",auth,async(req: Request, res: Response) => {
    try{
        const posts = await Post.find().sort({date: -1}); //내림차순으로 Post들을 정렬해줌 
        res.json(posts);
    }catch(err){
        res.status(500).send("Server Err");
    }
});
//해당 게시글 조회 
router.get("/:id",async(req: Request, res: Response) => {
    try{
        const post = await Post.findOne({user: req.params.user_id,});
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

//댓글 달기 

//좋아요누르기

//좋아요 취소 

//싫어요 누르기 

//싫어요 취소 


module.exports = router;