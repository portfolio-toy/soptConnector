import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import { IPost } from "../interfaces/IPost";

const PostSchema = new mongoose.Schema({

    author: {
        type : mongoose.Types.ObjectId,
        ref : "User",
        require : true,
    },
    date : {
        type : Date,
        require : true,
    },
    text : {
        type : String,
        require : true,
    },
    ddabong : {
        type : Number,
    },
    unddabong : {
        type : Number,
    },
    Comment : [
        {
            user :{
                type : mongoose.Types.ObjectId,
                ref : "User"
            },
            text : {
                type : String,
            }
        }
    ]
});

export default mongoose.model<IPost & mongoose.Document>("Post", PostSchema);
