import mongoose from "mongoose";
import { IComment } from "./IComment";


export interface IPost {
    author: mongoose.Types.ObjectId;
    date : Date;
    text : string;
    ddabong : Number;
    unddabong : Number;
    Comment : [IComment];
}

export interface IPostInputDTO{
    text : string;
}