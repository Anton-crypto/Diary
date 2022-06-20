import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../service/user.service';
import { ModerService } from '../service/moder.service';

import { IUser } from '../models/user.model';
import { ILoginModel } from '../models/logs.model';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})

export class LogsListComponent implements OnInit {

  logs: ILoginModel[] = []
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
    this.getLogs();
  }
  getLogs() {
    this.userService.getLogs().subscribe((logs) => {
      this.logs = logs;
      setTimeout(() => {this.check = true;}, 1000)
    });
  }

  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
