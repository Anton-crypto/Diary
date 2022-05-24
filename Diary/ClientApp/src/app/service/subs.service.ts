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
export class SubscriptionService {

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
    
    getSubsAll(id: string): Observable<ISubscriptions[]> {
        return this.http.get<ISubscriptions[]>(this.baseUrl + `subscriptions/getAllSub/${id}`,this.httpOptions);    
    }
    getSub(sub: ISubscriptions): Observable<ISubscriptions> {
        return this.http.post<ISubscriptions>(this.baseUrl + `subscriptions/getSub`, sub, this.httpOptions) 
    }
    getWriterAll(id: string): Observable<ISubscriptions[]> {
        return this.http.get<ISubscriptions[]>(this.baseUrl + `subscriptions/getAllWriter/${id}`,this.httpOptions);    
    }

    // Method group Post // 

    addSubs(sub: ISubscriptions) : Observable<ISubscriptions> {
        return this.http.post<ISubscriptions>(this.baseUrl + `subscriptions`, sub)
    }

    // Method group Delete // 

    deleteSubs(id: string) : Observable<ISaved> {
        return this.http.delete<ISaved>(this.baseUrl + `subscriptions/` + id)
    }
}