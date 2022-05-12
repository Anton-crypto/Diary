import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Inject } from '@angular/core';

import { IPost } from '../models/post.model';
import { StoreModel } from '../store';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class PostService {

    private baseUrl : string = "";
    private baseUrlImg : string = "";


    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor (
        private http: HttpClient,
        private storeModel:StoreModel,
        private jwtHelper: JwtHelperService
    ) { 
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

    getPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.baseUrl + `posts`, this.httpOptions);
    }
    createImgPath (serverPath: string) { 
        return this.baseUrlImg + serverPath; 
    }
}
