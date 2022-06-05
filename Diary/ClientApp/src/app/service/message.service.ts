import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { IPost } from '../models/post.model';
import { ISaved } from '../models/saved.model';
import { ISubscriptions } from '../models/subscriptions.model';
import { IMessage } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {

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

        if(token && refreshToken) {
            const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
            this.httpOptions.headers = new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: credentials
            })
        }
    }

    // Method group Get // 
    
    getCountUnSeen(id: string): Observable<string> {
        return this.http.get<string>(this.baseUrl + `comment/count/${id}`);    
    }
    getMessage(id: string): Observable<IMessage []> {
        return this.http.get<IMessage []>(this.baseUrl + `comment/message/${id}`);    
    }
}