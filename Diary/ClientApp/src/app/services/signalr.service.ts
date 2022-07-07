import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { IChatModel } from '../models/chat.model'
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public chats: IChatModel[] = []

  private hubConnection: signalR.HubConnection | undefined

  getUserFromLocalStorge () {
    return JSON.parse(localStorage.getItem("user")!);
  } 

  public startConnection = () => {

    let user : IUser = this.getUserFromLocalStorge()

    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`https://localhost:7022/chart?userId=${user.id}`)
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChartDataListener = () => {
    if(this.hubConnection != undefined) {
      this.hubConnection.on('transferchartdata', (chats) => {
        this.chats = chats
      });
    }
  }
  public broadcastChartData = (message: IChatModel) => {
    if(this.hubConnection != undefined) {
      this.hubConnection.invoke('broadcastchartdata', message).catch(err => console.error(err));
    }
  }
  public getNewMessageListener = () => {
    if(this.hubConnection != undefined) {
      this.hubConnection.on('getnewmessage', (chat) => {
        console.log("getnewmessage")
        this.chats.push(chat)
      });
    }
  }
  public addBroadcastChartDataListener = () => {
    if(this.hubConnection != undefined) {
      this.hubConnection.on('broadcastchartdata', (chat) => {
        this.chats.push(chat)
      })
    }
  }

}
