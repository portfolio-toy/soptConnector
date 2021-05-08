import mongoose from "mongoose";

export interface IComment {
  _id?: string;
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date: Date;
<<<<<<< HEAD
}
=======
}
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
