import { Injectable } from '@angular/core';

@Injectable()
export class StoreModel {

    private params =  {
        protocol: 'https://',
        host: 'localhost:7022/',
        prefix: 'api/',
    };

    constructor() {}

    public getBaseUrl() : string {
        return `${this.params.protocol + this.params.host + this.params.prefix}`
    }
    public getBaseUrlImg() : string {
        return `${this.params.protocol + this.params.host}`
    }

}