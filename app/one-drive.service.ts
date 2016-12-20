import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class OneDriveService {
    constructor(private http: Http) { }
    challengeForAuth(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve('ttttoooooookkkkkkkkeeeeeeennnn');
        });
    }
}