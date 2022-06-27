import { Component, OnInit} from '@angular/core'

import { HttpClient } from '@angular/common/http';
import { IChatModel } from '../models/chat.model';

import { SignalrService } from '../services/signalr.service';
import { UserService } from '../service/user.service';

import { IUser } from '../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {

  constructor(
    public signalRService: SignalrService, 
    private http: HttpClient, 
    private userService: UserService
  ) { }

  text : string = ""
  сhats : IChatModel[] = []
  users : IUser[] = []
  userIdChat : string = ""

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addBroadcastChartDataListener();   
    this.startHttpRequest();
    this.getUsers();
  }
  setUserChat(userIdChat: string) {
    console.log(userIdChat)
    this.userIdChat = userIdChat
  }
  private getUsers () {
    this.userService.getUsers().subscribe({
      next : (users) => {
        this.users = users
      }
    })
  }
  private startHttpRequest = () => {

    let user : IUser = this.userService.getUserFromLocalStorge();

    this.http.get('https://localhost:7022/api/chart/'+ user.id).subscribe(res => {
      console.log(res);
    })
  }
  public sendMessage = () => {
    let user: IUser = this.userService.getUserFromLocalStorge();

    let chat: IChatModel = {
      text : this.text,
      userToId : this.userIdChat,
      userFromId : user.id
    }
    console.log(chat)

    this.signalRService.broadcastChartData(chat);
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
