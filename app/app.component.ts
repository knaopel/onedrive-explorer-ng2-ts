import { Component, OnInit } from '@angular/core';
import { OneDriveService } from './one-drive.service';

@Component({
    selector: 'my-app',
    template: `
    <div id="od-loading"></div>
    <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    private loadedForHash: string;
    private token: string;
    private loggedIn:boolean=false;
    constructor(private oneDrvSvc: OneDriveService) { }

    ngOnInit() {
        // this.challengeForAuth();
    }
    challengeForAuth() {
        this.oneDrvSvc.challengeForAuth('00000000441B5345','onedrive.readonly wl.signin','https://localhost:3000/callback.html');
            // .then(token => {
            //     this.token = token;
            //     this.loggedIn = true;
            //     console.log(this);
            // });
    }

}