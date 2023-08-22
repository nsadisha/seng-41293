export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    success: boolean;
    email: string;
    access_token:  string;
}