import { Component, OnInit} from '@angular/core'

import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { VerificationService } from './verification.service';

import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'oidc-client';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})

export class VerificationComponent implements OnInit{
   
  credentials: LoginModel = {email:'', password:''};
  credentialsReg: RegisterModel = {email:'', password:'',nikeName:''};

  nikeName : string = ""
  isCheckLogin : boolean = false;

  constructor (
    private router: Router, 
    private http: HttpClient, 
    private jwtHelper: JwtHelperService,
    private verificationService: VerificationService
  ) { }

  ngOnInit(): void {
    
  }

  login ( form: NgForm) {
    if (form.valid) {
      this.verificationService.login(this.credentials).subscribe({
        next: (response: AuthenticatedResponse) => {

          const token = response.token;
          const refreshToken = response.refreshToken;
          const user : IUser = response.user;

          localStorage.setItem("jwt", token); 
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));

          this.router.navigate(["/"]);
        },
      })
    }
  }
  register ( form: NgForm) {
    if (form.valid) {
      this.verificationService.register(this.credentialsReg).subscribe({
        next: (response: AuthenticatedResponse) => {

          const token = response.token;
          const refreshToken = response.refreshToken;
          const user : IUser = response.user;

          localStorage.setItem("jwt", token); 
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));

          this.router.navigate(["/"]);
        },
      })
    }
  }
  checkTypeLogin() : boolean {
    return this.isCheckLogin;
  }
  toggolTypeLogin() {
    this.isCheckLogin = !this.isCheckLogin
  }
}
