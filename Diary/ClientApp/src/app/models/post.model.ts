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
}

