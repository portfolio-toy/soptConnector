import mongoose from "mongoose";
import {ILike} from "./ILike";
import {IComment} from "./IComment";

//좋아요 기능, 게시글 작성(content, 글쓴이, ),삭제  , 댓글 

export interface IPost {
    user: mongoose.Types.ObjectId;
    text: string;
    name: string;
    avatar:string; //프로필 사진 
    likes:[ILike];
    comments: [IComment];
    date: Date;
}