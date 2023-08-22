import { IUser } from "@seng-41293/model";

export class CreateAuthDto implements IUser{
    name: string;
    email: string;
    password: string;
}
