export interface IUser{
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    date: Date; 
}

export interface IUserInputDTO{
    name:String;
    email:string;
    password:string;
}