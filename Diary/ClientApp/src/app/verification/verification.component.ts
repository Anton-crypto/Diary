import { Component, OnInit} from '@angular/core'

import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthenticatedResponse } from '../models/authenticatedresponse.model';
import { VerificationService } from '../service/verification.service';

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
  isCheckLogin : Ver = Ver.Reg;

  passwordReq1 : boolean = false;
  passwordReq2 : boolean = false;
  passwordReq3 : boolean = false;

  email : string = ""
  textError: string = ""
  isTextErrorVisible: boolean = false

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
          localStorage.setItem("role", response.role);

          this.router.navigate(["/"]);
        },
        error: (error) => {
          this.isTextErrorVisible = true;
          if(error.error == "Invalid client request") {
            this.textError = "*Пользователя с такими данными не существует."
          }
          if(error.error == "IsBlok") {
            this.textError = "*Простите, но вы заблокированны на данном ресурсе."
          }

          setTimeout(() => {
            this.isTextErrorVisible = false
          }, 5000)
        }
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
          localStorage.setItem("role", response.role);

          this.router.navigate(["/"]);
        },
      })
    }
  }
  checkPassword() {
    
    this.passwordReq1 = false;
    this.passwordReq2 = false;
    this.passwordReq3 = false;

    if(this.credentialsReg.password.length >=6) {
      this.passwordReq1 = true;
    } 

    this.credentialsReg.password.split('').forEach(item => {
      if(this.checkSymbol(item)) {
        this.passwordReq2 = true
      }
      if(parseInt(item, 10) != NaN) {
        this.passwordReq3 = true
      }
    });
  }
  checkTypeLogin(valid: string) : boolean {
    return this.isCheckLogin == valid;
  }
  toggolTypeLogin(value: string) {
    if(value == Ver.Auth) {
      this.isCheckLogin = Ver.Auth
    } else if(value == Ver.Reg){
      this.isCheckLogin = Ver.Reg
    } else if(value == Ver.Res){
      this.isCheckLogin = Ver.Res
    }
  }
  checkSymbol(item: string) {
    const re = /^[a-z]$/i;
    return re.test(item);
  }
  resetPassword (form: NgForm) {
    if (form.valid) {       
      this.verificationService.reset(this.email).subscribe({
        next: () => {
        },
      })
    }
  }
}

enum Ver {
  Reg = "Reg",
  Auth = "Auth",
  Res = "Res",
}
