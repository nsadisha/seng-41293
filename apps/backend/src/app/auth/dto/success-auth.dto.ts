import { ILoginUser } from "@seng-41293/model";

export class SuccessAuthDto implements ILoginUser {
    success: boolean;
    email: string;
    access_token: string;
}