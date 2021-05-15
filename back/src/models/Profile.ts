import mongoose from "mongoose";
import { IProfile } from "../interfaces/IProfile";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  company: { // 회사
    type: String,
    required: true,
  },
  website: { // 자신의 웹사이트
    type: String,
  },
  location: { // 사는 지역
    type: String,
    required: true,
  },
  status: { // 상태
    type: String,
  },
  skills: { // 기술 스택
    type: [String], // 배열이라는 의미에요. skills 배열의 값으로 들어갑니다.
  },
  bio: { // 자신의 설명
    type: String,
  },
  githubusername: { // 깃허브 아이디
    type: String,
  },
  experience: [ // 경력 
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: { //언제부터
        type: Date,
        required: true,
      }, 
      to: { // 언제까지
        type: Date,
      },
      current: { // 지금 일하는 직장인지?
        type: Boolean,
        default: false,
      },
      description: { // 자신이 어떤일은 설명
        type: String,
      },
    },
  ],
  education: [ // 학력
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: [
    {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProfile & mongoose.Document>("Profile", ProfileSchema);