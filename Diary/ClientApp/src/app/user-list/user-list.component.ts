import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../service/user.service';
import { ModerService } from '../service/moder.service';

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

  role: string = ""
  isSub : boolean = true
  isSubCheckUser : boolean = false
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private moderService: ModerService,
  ) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      setTimeout(() => {this.check = true;}, 1000)
      console.log(users)
    });
  }
  blockUser (id: string) {
    this.moderService.blockingUser(id).subscribe({
      next: () => {
        this.getUsers();
      }
    })
  }
  banUser(user: IUser) {
    this.moderService.banUser(user.id).subscribe({
      next: () => {
        this.getUsers();
      }
    })
  }
  unBlockUser (id: string) {
    this.moderService.unBlockingUser(id).subscribe({
      next: () => {
        this.getUsers();
      }
    })
  }
  unBanUser(user: IUser) {
    this.moderService.unBanUser(user.id).subscribe({
      next: () => {
        this.getUsers();
      }
    })
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
