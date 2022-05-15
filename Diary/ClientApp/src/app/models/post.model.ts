import { IPostVidio } from "./sub-post/post-vidio.model"
import { IPostText } from "./sub-post/post-text.model"
import { IPostImage } from "./sub-post/post-image.model"
import { IComment } from "./sub-post/comment.model"

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
    Comment : IComment []
    postVidio : IPostVidio []
    postText : IPostText []
    postImage : IPostImage []
}
