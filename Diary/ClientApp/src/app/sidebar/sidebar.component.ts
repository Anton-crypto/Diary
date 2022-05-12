import { Component, Inject } from '@angular/core'
import { JwtHelperService, } from "@auth0/angular-jwt";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {

  constructor(private jwtHelper: JwtHelperService) { }

  isUserAuthenticated = (): boolean => {
    let token = localStorage.getItem("jwt");
    
    //console.log(!this.jwtHelper.isTokenExpired(token!))

    if (token){
      
      return true;
    }
    return false;
  }
}
