import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

import { IUser } from '../../models/user.model';
import { StoreModel } from '../../store';

@Injectable({ providedIn: 'root' })
export class SidebarUserService {

    private baseUrl : string = "";

    httpOptions = {
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

            console.log(token)
            console.log(refreshToken)

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
    putUser() {

    }
}
