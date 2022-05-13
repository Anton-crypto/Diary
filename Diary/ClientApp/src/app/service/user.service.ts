import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';


import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl: string 
  private httpOptions = {
    headers: {}
  };

  constructor (
    private http: HttpClient,
    private storeModel:StoreModel,
    private jwtHelper: JwtHelperService
) { 
    const token = localStorage.getItem("jwt");
    const refreshToken: string = localStorage.getItem("refreshToken")!;

    this.baseUrl = storeModel.getBaseUrl()

    if(token && refreshToken) {
      const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
      
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        Authorization:  'Bearer ' + token,
      })
    }
}
  getUser(id: string): Observable<IUser []> {
    return this.http.get<IUser[]>(this.baseUrl + `user/?id=${id}`,this.httpOptions);
  }
  putUser(file: File, user: IUser) : Observable<AuthenticatedResponse> {

    const formData = new FormData();

    formData.append('file', file);

    formData.append('id', user.id);
    formData.append('name', user.name);
    formData.append('icon', user.icon);

    return this.http.put<AuthenticatedResponse>(this.baseUrl + `user`, formData, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
  }
}
