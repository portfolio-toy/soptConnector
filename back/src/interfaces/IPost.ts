import mongoose from "mongoose";
import { IComment } from "./IComment";
import { ILike } from "./ILike";

export interface IPost {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  likes: [ILike];
  skills: [string];
  comments: [IComment];
  date: Date;
<<<<<<< HEAD
}
=======
}
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
