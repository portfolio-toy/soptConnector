import mongoose from "mongoose";
<<<<<<< HEAD
import { type } from "node:os";
=======
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

<<<<<<< HEAD
export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
=======
export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
