export interface IEducation {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface IEducationInputDTO {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}
