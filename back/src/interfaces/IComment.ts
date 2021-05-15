import mongoose from "mongoose";

export interface IComment {
  _id?: string;
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date?: Date;
}
