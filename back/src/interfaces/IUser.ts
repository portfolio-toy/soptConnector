export interface IUser{
    id:String;
    name:string;
    email:string;
    password:string;
    avatar:string;
    date:Date;
}

export interface IUserInputDTO{
name:string;
email:string;
password:string;

}