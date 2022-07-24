import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreModel } from '../store';
import { Observable, of } from 'rxjs';

import { IMucisModel } from '../models/mucis.model';

@Injectable({ providedIn: 'root' })
export class MusicService {

  private baseUrl: string
  private baseUrlImg : string = "";

  constructor (
    private http: HttpClient,
    private storeModel:StoreModel,
  ) {
    this.baseUrl = storeModel.getBaseUrl()
    this.baseUrlImg = storeModel.getBaseUrlImg()
  }

  getMucis(): Observable<IMucisModel[]> {
    return this.http.get<IMucisModel[]>(this.baseUrl + `music`);
  }
  createPath (serverPath: string) {
    return this.baseUrlImg + serverPath;
  }
}
