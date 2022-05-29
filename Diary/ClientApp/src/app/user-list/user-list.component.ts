import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';;
import { UserService } from '../service/user.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users: IUser[] = []
  uderId: string | undefined = ""
  check: boolean =  false

  isSub : boolean = true
  isSubCheckUser : boolean = false
  
  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      setTimeout(() => {this.check = true;}, 1000)
    });
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
