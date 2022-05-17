import { IPostVidio } from "./sub-post/post-vidio.model"
import { IPostText } from "./sub-post/post-text.model"
import { IPostImages } from "./sub-post/post-image.model"
import { IComment } from "./sub-post/comment.model"
import { ISaved } from "./saved.model"

export interface IPost {
    id : number
    timePost : string 
    title : string
    bodyText : string
    bodyUrlImg : string
    userId : string
    user: {
        id: number
        email : string
        name : string
        icon : string
        posts : []
    }
    comments : IComment []
    saveds : ISaved []
    postVidio : IPostVidio []
    postTexts : IPostText []
    postImages : IPostImages []
    postItem : any []
    isAccessories : any
}
