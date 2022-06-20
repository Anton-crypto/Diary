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

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
    }

    // Method group Get // 
    
    getCountUnSeen(id: string): Observable<string> {
        return this.http.get<string>(this.baseUrl + `message/${id}`);    
    }
    getMessage(id: string): Observable<IMessage []> {
        return this.http.get<IMessage []>(this.baseUrl + `message/${id}`);    
    }
}