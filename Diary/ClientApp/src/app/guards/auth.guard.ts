import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreModel } from '../store';
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {

  baseUrl : string = ""

  constructor (
    private router:Router, 
    private http: HttpClient,
    private storeModel:StoreModel,
  ) {
    this.baseUrl = storeModel.getBaseUrl()
  }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = localStorage.getItem("jwt")!;

    if (token){
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token); 

    if (!isRefreshSuccess) { 
      this.router.navigate([""]); 
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {

    const refreshToken: string = localStorage.getItem("refreshToken")!;

    if (!token || !refreshToken) { 
      return false;
    }
    
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.http.post<AuthenticatedResponse>(this.baseUrl + `/token/refresh`, credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe({
        next: (res: AuthenticatedResponse) => resolve(res),
        error: (_) => { reject; isRefreshSuccess = false;}
      });
    });

    localStorage.setItem("jwt", refreshRes.token);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);
    localStorage.setItem("user", JSON.stringify( refreshRes.user));


    isRefreshSuccess = true;

    return isRefreshSuccess;
  }
}