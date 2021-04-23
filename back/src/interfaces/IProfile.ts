import mongoose from "mongoose";
import { IExperience } from "./IExperience";
import { IEducation } from "./IEducation";
import { ISocial } from "./ISocial";

export interface IProfile {
  user: mongoose.Types.ObjectId;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  githubusername: string;
  experience: [IExperience];
  education: [IEducation];
  social: [ISocial];
  date: Date;
}

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
