export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    data: Date;
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}