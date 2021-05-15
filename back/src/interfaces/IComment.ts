import mongoose from "mongoose";

export interface IComment {
  _id?: string; // key값이라서 string으로!
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}