import { Component, OnInit } from '@angular/core';
import { OneDriveService } from './one-drive.service';

@Component({
    selector: 'my-app',
    template: `
    <a *ngIf="!loggedIn" id="loginText" (click)="challengeForAuth()" href="#">[sign in]</a>
    <div id="od-loading"></div>
    <div id="od-breadcrumb">
    </div>
    <div id="od-content">
        <div id="od-items" class="od-pagecol"></div>
        <div id="od-json" class="od-pagecol"></div>
    </div>
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
        this.oneDrvSvc.challengeForAuth()
            .then(token => {
                this.token = token;
                this.loggedIn = true;
                console.log(this);
            });
    }

}