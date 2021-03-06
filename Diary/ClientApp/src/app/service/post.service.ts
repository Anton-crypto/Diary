import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';
import { IPost } from '../models/post.model';
import { IComment } from '../models/sub-post/comment.model';
import { ISaved } from '../models/saved.model';
import { ILike } from '../models/like.model';
import { ISearch } from '../models/search.model';

@Injectable({ providedIn: 'root' })
export class PostService {

    private baseUrl : string = "";
    private baseUrlImg : string = "";

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl();
        this.baseUrlImg = storeModel.getBaseUrlImg();
    }

    // Method group Get // 
    getPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts`, this.httpOptions);
    } 
    getPostsPagination(pagination: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/pagination/${pagination}`, this.httpOptions);
    } 

    getHotPost(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/hotter`);    
    }
    getBestPost(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/best`);    
    }
    getFreshPost(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/fresh`);    
    }
    getSubscriptionsPost(id: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/subscriptions/${id}`);    
    }
    getCollPost(email: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/coll/${email}`);    
    }

    // Method group Get // 
    
    getPost(id: string): Observable<IPost> {
        return this.http.get<IPost>(this.baseUrl + `posts/update/${id}`);    
    }
    getSavedPost(id: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `saved/${id}`,this.httpOptions);    
    } 
    getMyPosts(id: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/mypost/${id}`);
    }  
    getPostSubscriptions(id: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/subscriptions/${id}`);
    }  
    getPostModer(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts/moder`);
    } 
    getPostsForSearch(search : ISearch): Observable<IPost[]> {
        return this.http.post<IPost[]>(this.baseUrl + `posts/search`, search, this.httpOptions)
    }
    // Method group Post // 

    addPost(formData: FormData) : Observable<IPost> {
        return this.http.post<IPost>(this.baseUrl + `posts`,formData)
    }
    addComment(comment : IComment ): Observable<IComment> {
        return this.http.post<IComment>(this.baseUrl + `comment`, comment, this.httpOptions)
    }
    savedPost(saved: ISaved) : Observable<ISaved> {
        return this.http.post<ISaved>(this.baseUrl + `saved`, saved, this.httpOptions)
    }
    likePost(like: ILike) : Observable<ILike> {
        return this.http.post<ILike>(this.baseUrl + `like`, like, this.httpOptions)
    }

    // Method group Delete // 

    unSavedPost(id: string) : Observable<ISaved> {
        return this.http.delete<ISaved>(this.baseUrl + `saved/${id}`)
    }
    unLikePost(id: string) : Observable<ILike> {
        return this.http.delete<ILike>(this.baseUrl + `like/${id}`)
    }
    deletePost(id: string) : Observable<string> {
        return this.http.delete<string>(this.baseUrl + `posts/delete/${id}`)
    }
    deletePostModer(id: string, idUser: string) : Observable<string> {
        return this.http.delete<string>(this.baseUrl + `posts/deletemo/${id}&${idUser}`)
    }

    // Method group Put // 

    putPost(formData: FormData) : Observable<AuthenticatedResponse> {
        return this.http.put<AuthenticatedResponse>(this.baseUrl + `posts`,formData)
    }

    /////////////////////

    public createImgPath (serverPath: string) { 
        return this.baseUrlImg + serverPath; 
    }

    public getRout() {
        return localStorage.getItem("role")!;
    }

    public createPostSubItem(posts : IPost[]) : IPost[] {
        let user = JSON.parse(localStorage.getItem("user")!);
        
        posts.forEach(post => {
  
          const time = this.diffDays(new Date(post.timePost), new Date());

          if (time == 1) {
            post.timePost = ` ${time} ???????? ??????????`;
          } else if (time <= 4 && time > 1) {
            post.timePost = ` ${time} ?????? ??????????`;
          } else if (time >= 5) {
            post.timePost = ` ${time} ???????? ??????????`;
          } else if(time == 0) {
            post.timePost = `??????????????`;
          }
  
          let item : any [] = [] 
  
          if(post.postImages != undefined && post.postImages.length > 0) 
            item.push(...post.postImages)
          if(post.postTexts != undefined && post.postTexts.length > 0) 
            item.push(...post.postTexts)
          if(post.postVidios != undefined && post.postVidios.length > 0) 
            item.push(...post.postVidios)
  
          item.sort((a, b) => a.displayNumber > b.displayNumber ? 1 : -1);
          post.postItem = item

            if(user != null) {
                post.isAccessories = user.email == post.user.email ?  true : false;
            }
        });

        return posts;
    }
    public diffDays(dateFirst: Date, dateLast: Date): number {

        const timeDiff : number = Math.abs(dateFirst.getTime() - dateLast.getTime());
        const diffDays : number = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        if(dateFirst.toDateString() === dateLast.toDateString()) {
            return 0
        }
        
        return diffDays;
    }
}