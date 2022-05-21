import { Component, Inject } from '@angular/core'
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss']
})

export class SidebarUserComponent {

  constructor(private userService: UserService) { }
  
  user: IUser | undefined;

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser() {
    let user = JSON.parse(localStorage.getItem("user")!);
    
    if(user) {
      this.userService.getUserOnEmail(user.email).subscribe((user) => {
        this.user = user;
        localStorage.setItem("userExtendedModel", JSON.stringify(this.user));
      });
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userModel");
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
