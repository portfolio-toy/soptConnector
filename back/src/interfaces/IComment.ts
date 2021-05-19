import mongoose from "mongoose";

export interface IComment {
  _id?: mongoose.Types.ObjectId; // mongoose에서 ObjectId타입의 _id를 생성해줌 string으로 선언해도 ObjectId타입으로 들어간다!
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date?: Date;
}