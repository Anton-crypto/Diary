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
      this.userService.getUser(user.id).subscribe((hero) => {
        this.user = hero[0];
        localStorage.setItem("userModel", JSON.stringify(user));
        if(!hero[0]) {
          this.logOut();
        }
      });
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
