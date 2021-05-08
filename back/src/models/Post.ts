/*
[ 3차과제 (2) ]
3차 세미나 과제는 "Post 데이터 설계해보기"였습니다.
먼저 model 코드를 살펴보겠습니다.
게시물(Post)에는 다음과 같은 것들이 필요합니다!

- 게시자 정보(user)
- 게시글 내용(text)
- 게시자 이름(name)
- 게시자 프로필 사진(avatar)
- 게시글의 좋아요 누른 유저(likes)
- 게시글의 댓글(comments)
*/

import mongoose from "mongoose";
//엑스포트가 여러개인 것만 묶을 수 있대, 그래서 몽구스는 안돼
import { IPost } from "../interfaces/IPost";
import { ILike } from "../interfaces/ILike";
import { IComment } from "../interfaces/IComment";

const PostSchema = new mongoose.Schema({
  //몽구스 자체타입 이름은 대문자로 되어있음 (시퀄라이즈, 몽구스가 디파인한게 따로있음)
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPost & mongoose.Document>(
  "Post", 
  PostSchema
);
