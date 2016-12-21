import { Component, OnInit } from '@angular/core';

import { OneDriveService } from './one-drive.service';

@Component({
    selector: 'my-app',
    template: `
    <div>Login</div>
    <a *ngIf="!loggedIn" id="loginText" href="//login.live.com/oauth20_authorize.srf?client_id={{clientId}}&scope={{scopes}}&response_type=token&redirect_uri={{returnUrl}}">[sign in]</a>
    `
})
export class LoginComponent {
    private clientId: string = '00000000441B5345';
    private scopes: string = 'onedrive.readonly wl.signin';
    private returnUrl: string = 'https://localhost:3000/callback';

    constructor(private oneDrvSvc: OneDriveService) {
        // this.clientId = '00000000441B5345';
        // this.scopes = 'onedrive.readonly wl.signin';
        this.returnUrl = encodeURIComponent(this.returnUrl);
     }
    // ngOnInit() { }

    challengeForAuth(): void {
        this.oneDrvSvc.challengeForAuth(this.clientId, this.scopes, this.returnUrl);
    }
}
