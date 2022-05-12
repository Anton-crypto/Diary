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
  
  user: IUser | undefined;

  ngOnInit(): void {
    this.getUser();
    console.log(this.user)
  }
  
  getUser() {
    
    let user = JSON.parse(localStorage.getItem("user")!);

    // console.log(user.id);
    // console.log(user);
    // console.log(localStorage.getItem("jwt"));

    if(user) {
      this.sidebarUserService.getUser(user.id).subscribe((hero) => {
        this.user = hero[0];
        console.log(hero[0])
      });
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}
