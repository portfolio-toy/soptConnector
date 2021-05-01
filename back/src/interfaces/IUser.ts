export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
  salt: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}