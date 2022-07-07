import { Component, OnInit} from '@angular/core'

import { HttpClient } from '@angular/common/http';
import { IChatModel } from '../models/chat.model';

import { SignalrService } from '../services/signalr.service';
import { UserService } from '../service/user.service';
import { ChatService } from '../services/chat.service';

import { IUser } from '../models/user.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {

  constructor(
    public signalRService: SignalrService, 
    private http: HttpClient, 
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  text : string = ""
  сhats : IChatModel[] = []
  users : (IUser)[] | null = []
  userIdChat : string = ""
  user!: IUser 

  ngOnInit() {
    this.user = this.userService.getUserFromLocalStorge();

    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addBroadcastChartDataListener();   
    this.signalRService.getNewMessageListener();
    this.startHttpRequest();
    this.getUsers();
  }
  setUserChat(userIdChat: string) {

    this.userIdChat = userIdChat;
    this.http.get<IChatModel[]>(`https://localhost:7022/api/chart/getcats/${this.user.id}&${userIdChat}`).subscribe(сhats => {
      this.signalRService.chats = сhats
    })

  }
  private getUsers () {
    this.userService.getUsers().pipe(
      
      map((users) => {
        users.forEach((user, i) => {
          if(user.id == this.user.id) {
            users.splice(i, 1);
            return;
          }
        });
        return  users;
      }),

    ).subscribe({
      next : (users) => {
        this.users = users
      }
    })
  }
  private removeById(fromItems: any, id: any) {
    const index1  = fromItems.findIndex((element: any) => {
      return element.id === id;
    });
    if (index1 >= 0 ) {
      fromItems.splice(index1,1);
    }
    return fromItems;
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
    this.chatService.postChatMessage(chat).subscribe({
      next: (chat) => {
        this.signalRService.chats.push(chat);
      }
    })
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
