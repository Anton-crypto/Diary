import { IUser } from "./user.model"

export interface ISubscriptions {
    id : string
    users? : IUser
    user? : IUser []
    userSubscriptionID: string
    userWriterID : string
}
