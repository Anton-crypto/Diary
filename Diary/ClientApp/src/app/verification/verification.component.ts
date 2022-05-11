import { Component, OnInit} from '@angular/core'
import { LoginModel } from '../models/login.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';

import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})

export class VerificationComponent implements OnInit{
   
  invalidLogin: boolean = true;
  credentials: LoginModel = {email:'', password:''};

  constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    
  }
  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("https://localhost:7022/api/auth/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      
      return true;
    }
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }
}
