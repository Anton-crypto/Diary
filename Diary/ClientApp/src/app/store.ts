import { Injectable } from '@angular/core';

@Injectable()
export class StoreModel {

    private params =  {
        host: 'localhost:7022/api/',
        protocol: 'https://',
    };

    constructor() {}

    public getBaseUrl() : string {
        return `${this.params.protocol + this.params.host}`
    }

}