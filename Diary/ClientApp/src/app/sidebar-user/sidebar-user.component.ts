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
    this.getUser("6f9619ff-8b86-d011-b42d-00cf12c964ff");
  }
  
  getUser(id : string) {
    this.sidebarUserService.getUser(id).subscribe((user) => {
      this.user = user
    });
  }
}
