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
  social: [ISocial]; // object 형태일 수 있으니 알아보자 
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
  social?: ISocial; // object 형태일 수 있으니 알아보자
  date?: Date;
}