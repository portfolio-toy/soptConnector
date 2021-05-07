import mongoose from "mongoose";
import { IPost } from "../interfaces/IPost";

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    post:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    like:{
        type:Number,
    },
    unlike:{
        type:Number,
    },
    comments:[
        {
            user:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
            },
            comment:{
                type:String,
                required:true,
            },
            date:{
                type:Date,
                default: Date.now,
            }
        } 
    ]
})

export default mongoose.model<IPost & mongoose.Document>(
    "Post",
    PostSchema
  );