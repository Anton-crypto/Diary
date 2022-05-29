import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { IPost } from '../models/post.model';
import { ISaved } from '../models/saved.model';
import { ISubscriptions } from '../models/subscriptions.model';


@Injectable({ providedIn: 'root' })
export class ModerService {

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

    // Method group Get // 
    
    reject(id: string): Observable<string> {
        return this.http.get<string>(this.baseUrl + `moder/reject/${id}`);    
    }
    example(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + `moder/${id}`) 
    }
}