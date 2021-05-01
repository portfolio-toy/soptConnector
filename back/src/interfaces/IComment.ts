import mongoose from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}
