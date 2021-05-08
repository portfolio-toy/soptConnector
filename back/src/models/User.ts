import mongoose from "mongoose";
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
>>>>>>> 461ab6ebade6d66f779922733fe90a096638a510
