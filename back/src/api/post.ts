import express, {Request, Response} from "express";
import Post from "../models/Post";

import config from "../config";

import auth from "../middlewares/auth";

import {check,validationResult} from "express-validator";

const router = express.Router();

//게시글 작성 


//게시글 삭제 


//댓글 달기 

//좋아요누르기

//좋아요 취소 

//싫어요 누르기 

//싫어요 취소 