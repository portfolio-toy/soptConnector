import mongoose from "mongoose";

export interface IComment {
  _id?: string; //얜 뭘까?
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}