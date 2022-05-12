import { IUser } from "./user.model";

export interface AuthenticatedResponse {
    token: string;
    refreshToken: string;
    user : IUser
}