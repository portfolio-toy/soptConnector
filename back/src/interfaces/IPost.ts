import mongoose from "mongoose";
import { IComment } from "./IComment";
// mongoose의 여러가지 스키마 타입
// String, Number, id, Date, Buffer, Boolean, Mixed, Array

export interface IPost{
    user:mongoose.Types.ObjectId;
    post:string;
    date:Date;
    like:Number;
    unlike:Number;
    comments:[IComment];
}