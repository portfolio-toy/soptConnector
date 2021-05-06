import mongoose from "mongoose";

export interface IComment {
    user : mongoose.Types.ObjectId;
    text : string;
}

export interface ICommentDTO{
    text : string,
}