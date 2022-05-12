import { Component, Inject } from '@angular/core'
import { SidebarUserService } from './sidebar-user.service';
import { IUser } from '../models/user.model';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss']
})

export class SidebarUserComponent {

  constructor(private sidebarUserService: SidebarUserService) { }
  
  user: IUser = {
    Id: "",
    Email: "",
    Name: "",
    Icon: "",
  };

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser() {
    
    let user = JSON.parse(localStorage.getItem("user")!);

    // console.log(user.id);
    // console.log(user);
    // console.log(localStorage.getItem("jwt"));

    if(this.user) {
      this.sidebarUserService.getUser(user.id).subscribe((user) => {
        this.user = user
        console.log(this.user)
      });
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}
