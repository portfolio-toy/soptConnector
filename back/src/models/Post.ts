import mongoose from "mongoose";
import { IPost } from "../interfaces/IPost";

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    text:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    likes:[
     {
        user:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
     }
    ],
    comments:[
     {
        user:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        text:{
            type: String,
            required: true,
        },
        name:{
            type: String,
        },
        avatar:{
            type: String,
        },
        date:{
            type:Date,
             default: Date.now,
        }
     }
    ],
});

export default mongoose.model<IPost & mongoose.Document>("Post",PostSchema)

