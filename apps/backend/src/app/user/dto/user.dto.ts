import { IUser } from "@seng-41293/model";
import { ObjectId } from "mongoose";

export class UserDto implements IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
}