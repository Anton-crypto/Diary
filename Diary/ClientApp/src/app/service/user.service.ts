import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';

import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl: string 
  private baseUrlImg : string = "";

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
    this.baseUrlImg = storeModel.getBaseUrlImg()

    if(token && refreshToken) {
      const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
      
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Accept' : 'application/json',
        Authorization:  'Bearer ' + token,
      })
    }
}
  getUser(id: string): Observable<IUser []> {
    return this.http.get<IUser[]>(this.baseUrl + `user/?id=${id}`,this.httpOptions);
  }
  putUser(formData: FormData) : Observable<IUser []> {
    return this.http.put<IUser []>(this.baseUrl + `user`, formData)
  }
  createImgPath (serverPath: string) { 
    return this.baseUrlImg + serverPath; 
}
}
