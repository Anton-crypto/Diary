import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  countUnSennMessage: number = 0

  constructor (
    private messageService: MessageService, 
    private userService: UserService, 
  ) { 

  }
  ngOnInit(): void {
    this.getCountUnSeenMessage();
  }
 
  collapse() {
    this.isExpanded = false;
  }
  getCountUnSeenMessage(): void {
    let user = this.userService.getUserFromLocalStorge();

    if(user != null) {
      this.messageService.getCountUnSeen(user.id).subscribe({
        next: (count : string) => {
          this.countUnSennMessage = Number(count);
          console.log(this.countUnSennMessage)
        },
      })
    }
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
