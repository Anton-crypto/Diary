import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';

import { IChatModel } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {

    private baseUrl : string = "";

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
    }

    postChatMessage(chat: IChatModel): Observable<IChatModel> {
        return this.http.post<IChatModel>(this.baseUrl + `chart`, chat);    
    }
}