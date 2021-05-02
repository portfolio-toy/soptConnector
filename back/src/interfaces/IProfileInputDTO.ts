import mongoose from "mongoose";
import { IEducation } from "./IEducation";
import { IExperience } from "./IExperience";
import { ISocial } from "./ISocial";

export interface IProfileInputDTO {
  user: mongoose.Types.ObjectId;
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: [string];
  bio?: string;
  githubusername?: string;
  experience?: [IExperience];
  education?: [IEducation];
  social?: ISocial;
}