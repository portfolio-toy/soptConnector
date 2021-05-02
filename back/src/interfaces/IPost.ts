import mongoose from "mongoose";
import { ILike } from "./ILike";
import { IComment } from "./IComment";

export interface IPost {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  likes: [ILike];
  comments: [IComment];
  data: Date;
}