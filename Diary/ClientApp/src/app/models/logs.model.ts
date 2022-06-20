import { IPost } from "./post.model";
import { IUser } from "./user.model";

export interface ILoginModel {
    id: string;
    userID : string;
    postID: string;

    user : IUser
    post : IPost

    time: Date
    text: string
}