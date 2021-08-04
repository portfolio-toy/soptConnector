// ./src/customType/express.d.ts
// 공부
import { Document } from "mongoose";
import { IUser } from "../interfaces/IUser";
declare global {
  namespace Express {
    interface Request {
      user?: IUser & Document;
    }
  }
}