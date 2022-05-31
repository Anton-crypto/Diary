import { Component, Inject } from '@angular/core'
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss']
})

export class SidebarUserComponent {

  constructor(
    private userService: UserService, 
    private location: Location,
    private route: ActivatedRoute,
  ) { }
  
  user: IUser | undefined;
  userRole: string = ""

  ngOnInit(): void {
    console.log('getUser')
    this.getUser();
  }
  
  getUser() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.userRole = localStorage.getItem("role")!;

    console.log(this.userRole)
    
    if(user) {
      this.userService.getUserOnEmail(user.email).subscribe({
        next: (user: IUser) => {
          this.user = user;
        },
        error: () => {
          this.logOut();
        }
      })
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    
    window.location.reload();
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
