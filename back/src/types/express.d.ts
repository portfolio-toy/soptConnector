<<<<<<< HEAD
// ./src/customType/express.d.ts
=======
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
import { Document } from "mongoose";
import { IUser } from "../interfaces/IUser";
declare global {
  namespace Express {
    interface Request {
      user?: IUser & Document;
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 130812cb7753b7d3d63745d99110c8847a50f7cf
