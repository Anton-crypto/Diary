import { Component, Inject, Input, OnInit } from '@angular/core'

import { MessageService } from '../service/message.service';
import { ModerService } from '../service/moder.service';
import { UserService } from '../service/user.service';

import { ActivatedRoute } from '@angular/router';

import { IPost } from '../models/post.model';
import { ISaved } from '../models/saved.model';
import { IUser } from '../models/user.model';
import { ILike } from '../models/like.model';
import { IMessage } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {

  messages: IMessage [] | undefined

  constructor (
    private messageService: MessageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {

    let user = this.userService.getUserFromLocalStorge();

    this.messageService.getMessage(user.id).subscribe(((messages) => {
      this.messages = messages
      console.log(this.messages)
    }));
  }
}
