import mongoose from "mongoose";
import { IComment } from "./IComment";

export interface IPost {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  likes: [mongoose.Types.ObjectId];
  skills: [string];
  comments: [IComment];
  date: Date;
}
