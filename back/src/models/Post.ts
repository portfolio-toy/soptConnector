import mongoose from "mongoose";
import { IPost } from "../interfaces/IPost";

const PostSchema = new mongoose.Schema({
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
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

<<<<<<< HEAD
export default mongoose.model<IPost & mongoose.Document>("Post", PostSchema);
=======
export default mongoose.model<IPost & mongoose.Document>("Post", PostSchema);
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
