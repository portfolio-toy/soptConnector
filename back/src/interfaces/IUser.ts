export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface ITest{
  attr1: string;
  attr2: string;
  attr3: string;
}
