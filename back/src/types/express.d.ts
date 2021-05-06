// ./src/customType/express.d.ts
import { Document } from "mongoose";
import { IUser } from "../interfaces/IUser";
declare global {
  namespace Express {
    interface Requets {
      user?: IUser & Document;
    }
  }
}