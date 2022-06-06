import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../service/user.service';
import { ModerService } from '../service/moder.service';

import { IUser } from '../models/user.model';

@Component({
  selector: 'app-moder',
  templateUrl: './moder.component.html',
  styleUrls: ['./moder.component.scss']
})

export class ModerComponent implements OnInit {

  users: IUser[] = []
  uderId: string | undefined = ""
  check: boolean =  false

  isSub : boolean = true
  isSubCheckUser : boolean = false
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private moderService: ModerService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getModers()  .subscribe((users) => {
      this.users = users;
      setTimeout(() => {this.check = true;}, 1000)
    });
  }
  deleteModer(id: string) {
    this.moderService.deleteModer(id).subscribe({
      next: () => {
        this.check = false;
        this.getUsers();
      },
      error: () => {}

    });
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
