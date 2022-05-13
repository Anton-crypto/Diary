import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { StoreModel } from '../store';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { Observable, of } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({ providedIn: 'root' })
export class UserService {

    private baseUrl: string 

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
    }

    addPost(credentials: LoginModel) : Observable<AuthenticatedResponse> {

        return this.http.post<AuthenticatedResponse>(this.baseUrl + `auth/login`, credentials, {
            headers: new HttpHeaders({ "Content-Type": "application/json"})
        })
    }
    putPost(credentials: LoginModel) : Observable<AuthenticatedResponse> {

        return this.http.put<AuthenticatedResponse>(this.baseUrl + `auth/login`, credentials, {
            headers: new HttpHeaders({ "Content-Type": "application/json"})
        })
    }
}