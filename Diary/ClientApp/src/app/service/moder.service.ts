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

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
    }

    // Method group Get // 
    
    reject(id: string): Observable<string> {
        return this.http.get<string>(this.baseUrl + `moder/reject/${id}`);    
    }
    example(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + `moder/${id}`) 
    }
    blockingUser(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + `moder/blocking/${id}`) 
    }
    banUser(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + `moder/ban/${id}`) 
    }
    deleteModer(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + `moder/delete/${id}`) 
    }
}