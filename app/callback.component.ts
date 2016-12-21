import { Component, OnInit } from '@angular/core';
import{Router}from'@angular/router';

@Component({
    selector: 'my-app',
    template: ''
})
export class CallbackComponent implements OnInit {
    constructor(private router:Router) { }
    ngOnInit() {
        let authInfo = this.getAuthInfoFromUrl();
        let token = authInfo['access_token'];
        let expiry = parseInt(authInfo['expires_in']);
        this.setCookie(token, expiry);
        this.router.navigate(['/content']);
        // navigate to content
    }
    getAuthInfoFromUrl(): any {
        if (window.location.hash) {
            let authResponse = window.location.hash.substr(1);
            let authInfo = JSON.parse(
                `{"${authResponse.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
                (key, value) => {
                    return key === '' ? value : decodeURIComponent(value)
                });
            return authInfo;
        } else {
            alert('failed to recieve auth token');
        }

    }
    setCookie(token: string, expiresInSeconds: number): void {
        let expiration = new Date();
        expiration.setTime(expiration.getTime() + expiresInSeconds * 1000);
        let cookie = `odauth=${token}; path=/; expires=${expiration.toUTCString()}`;
        if (document.location.protocol.toLowerCase() == 'https') {
            cookie = `${cookie};secure`;
        }
        document.cookie = cookie;
    }
}