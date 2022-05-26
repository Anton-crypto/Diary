import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { StoreModel } from '../store';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { Observable, of } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({ providedIn: 'root' })
export class VerificationService {

    private baseUrl: string 

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
    }

    login(credentials: LoginModel) : Observable<AuthenticatedResponse> {

      const md5 = new Md5();
      let credent : RegisterModel = JSON.parse(JSON.stringify(credentials))
      credent.password = md5.appendStr(credent.password).end().toString();
      
      return this.http.post<AuthenticatedResponse>(this.baseUrl + `auth/login`, credent, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
    }
    register(credentials: RegisterModel) : Observable<AuthenticatedResponse> {

      const md5 = new Md5();
      let credent : RegisterModel = JSON.parse(JSON.stringify(credentials))
      credent.password = md5.appendStr(credent.password).end().toString();

      return this.http.post<AuthenticatedResponse>(this.baseUrl + `auth/register`, credent, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
    }
}
