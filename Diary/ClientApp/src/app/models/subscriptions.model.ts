import { IUser } from "./user.model"

export interface ISubscriptions {
    id : string
    user? : IUser[]
    userSubscriptionID: string
    userWriterID : string
}
