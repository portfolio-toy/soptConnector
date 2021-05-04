export interface IExperience {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

// req.body에 들어갈 값
// export interface IExperienceInputDTO {
//   title: string;
//   company: string;
//   location: string;
//   from: Date;
//   to: Date;
//   current: boolean;
//   description: string;
// }