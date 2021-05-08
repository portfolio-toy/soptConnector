import mongoose from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId;
}