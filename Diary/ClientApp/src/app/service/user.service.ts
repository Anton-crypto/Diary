import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';

import { IUser } from '../models/user.model';
import { ILoginModel } from '../models/logs.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl: string 
  private baseUrlImg : string = "";

  constructor (
    private http: HttpClient,
    private storeModel:StoreModel,
  ) { 
    this.baseUrl = storeModel.getBaseUrl()
    this.baseUrlImg = storeModel.getBaseUrlImg()
  }
  
  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + `user/id/${id}`);
  }
  getLogs(): Observable<ILoginModel []> {
    return this.http.get<ILoginModel []>(this.baseUrl + `moder/getLoges`);
  }
  getModers(): Observable<IUser []> {
    return this.http.get<IUser []>(this.baseUrl + `user/moder`);
  }
  getUsers(): Observable<IUser []> {
    return this.http.get<IUser []>(this.baseUrl + `user`);
  }
  getUserOnEmail(email: string): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + `user/email/${email}`);
  }
  putUser(formData: FormData) : Observable<IUser []> {
    return this.http.put<IUser []>(this.baseUrl + `user`, formData)
  }
  createImgPath (serverPath: string) { 
    return this.baseUrlImg + serverPath; 
  }
  getUserFromLocalStorge () {
    return JSON.parse(localStorage.getItem("user")!);
  } 
  getRole() : string {
    let role = localStorage.getItem("role");

    return role != null ? role : "";
  }
  setUserFromLocalStorge (user: IUser) {
    if(user != null) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  } 
}
