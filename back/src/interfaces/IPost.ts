import mongoose from "mongoose";
import { IComment } from "./IComment";
import { ILike } from "./ILike";

export interface IPost {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  likes: [ILike];
  skills: [string];
  comments: [IComment];
  date: Date;
}
