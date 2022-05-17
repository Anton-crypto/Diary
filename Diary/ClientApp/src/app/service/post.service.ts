import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { IPost } from '../models/post.model';
import { IComment } from '../models/sub-post/comment.model';
import { ISaved } from '../models/saved.model';

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
        private jwtHelper: JwtHelperService
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
        const token = localStorage.getItem("jwt");
        const refreshToken: string = localStorage.getItem("refreshToken")!;

        this.baseUrl = storeModel.getBaseUrl()
        this.baseUrlImg = storeModel.getBaseUrlImg()

        if(token && !this.jwtHelper.isTokenExpired(token) && refreshToken && !this.jwtHelper.isTokenExpired(refreshToken)) {
            const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
            this.httpOptions.headers = new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: credentials
            })
        }
    }
    getPost(id: string): Observable<IPost> {
        return this.http.get<IPost>(this.baseUrl + `posts/${id}`,this.httpOptions);    
    }
    addPost(formData: FormData) : Observable<IPost> {
        return this.http.post<IPost>(this.baseUrl + `posts`,formData)
    }
    addComment(comment : IComment ): Observable<IComment> {
        return this.http.post<IComment>(this.baseUrl + `comment`, comment, this.httpOptions)
    }
    putPost(formData: FormData) : Observable<AuthenticatedResponse> {
        return this.http.put<AuthenticatedResponse>(this.baseUrl + `auth/login`,formData)
    }
    getPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts`, this.httpOptions);
    }   

    savedPost(saved: ISaved) : Observable<ISaved> {
        return this.http.post<ISaved>(this.baseUrl + `saved`, saved, this.httpOptions)
    }
    unSavedPost(id: string) : Observable<ISaved> {
        return this.http.delete<ISaved>(this.baseUrl + `saved/` + id)
    }

    createImgPath (serverPath: string) { 
        return this.baseUrlImg + serverPath; 
    }
    public diffDays(dateFirst: Date, dateLast: Date): number {

        const timeDiff : number = Math.abs(dateFirst.getTime() - dateLast.getTime());
        const diffDays : number = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        
        return diffDays;
    }
}