import { IPostVidio } from "./sub-post/post-vidio.model"
import { IPostText } from "./sub-post/post-text.model"
import { IPostImages } from "./sub-post/post-image.model"
import { IComment } from "./sub-post/comment.model"
import { ISaved } from "./saved.model"
import { ILike } from "./like.model"

export interface IPost {
    id : string
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
    likes : ILike []
    postVidio : IPostVidio []
    postTexts : IPostText []
    postImages : IPostImages []
    postItem : any []
    isAccessories : any
}
