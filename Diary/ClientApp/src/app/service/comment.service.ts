import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';
import { IMessage } from '../models/message.model';
import { IComment } from '../models/sub-post/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {

    private baseUrl : string = "";
    
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor (
        private http: HttpClient, 
        private storeModel:StoreModel,
    ) { 
        this.baseUrl = storeModel.getBaseUrl()
    }

    // Method group Get // 
    
    getAll(id: string): Observable<IComment[]> {
        return this.http.get<IComment[]>(this.baseUrl + `comment/comm/${id}`);    
    }
    getAllCount(id: string): Observable<string> {
        return this.http.get<string>(this.baseUrl + `comment/count/${id}`);    
    }

    add(comment: IComment): Observable<IComment> {
        return this.http.post<IComment>(this.baseUrl + `comment`, comment);    
    }
    update(comment: IComment): Observable<IComment> {
        return this.http.put<IComment>(this.baseUrl + `comment`, comment);    
    }

    delete(id: string): Observable<IComment> {
        return this.http.delete<IComment>(this.baseUrl + `comment/delete/${id}`);    
    }
    deleteModeration(id: string): Observable<IComment> {
        return this.http.get<IComment>(this.baseUrl + `comment/moder/${id}`);    
    }
}