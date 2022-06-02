import { Component, Inject } from '@angular/core'
import { JwtHelperService, } from "@auth0/angular-jwt";
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {

  constructor(private jwtHelper: JwtHelperService) { }

  isUserAuthenticated = (): boolean => {

    let token = localStorage.getItem("jwt");
    // let refreshToken = localStorage.getItem("refreshToken");
    // let user: IUser = JSON.parse(localStorage.getItem("user")!);
    // let role = localStorage.getItem("role");

    //console.log(!this.jwtHelper.isTokenExpired(token!))

    if (token){
      
      return true;
    }
    return false;
  }
}
