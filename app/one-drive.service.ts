import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OneDriveService {
    constructor(private http: Http) { }
    challengeForAuth(clientId: string, scopes: string, retUrl: string): void {
        retUrl = encodeURI(retUrl);
        let url = `https://login.live.com/oauth20_authorize.srf?client_id=${clientId}&scope=${scopes}&response_type=token&redirect_uri=${retUrl}`;
        window.location.href = url;
        // this.popup(url);
    }

    private popup(url: string): void {
        let width = 525,
            height = 525,
            screenX = window.screenX,
            screenY = window.screenY,
            outerWidth = window.outerWidth,
            outerHeight = window.outerHeight;

        let left = screenX + Math.max(outerWidth - width, 0) / 2;
        let top = screenY + Math.max(outerHeight - height, 0) / 2;

        let features = [
            "width=" + width,
            "height=" + height,
            "top=" + top,
            "left=" + left,
            "status=no",
            "resizable=yes",
            "toolbar=no",
            "menubar=no",
            "scrollbars=yes"];
        let popup = window.open(url, "oauth", features.join(","));
        if (!popup) {
            alert("failed to pop up auth window");
        }

        popup.focus();
    }

    getItemsForPath(token: string, path: string): Promise<any> {
        let odUrl = '//api.onedrive.com/v1.0/drive/root';

        if (path) {
            odUrl += `:${path}:`;
        }

        // the expand and select parameters mean:
        //  "for the item i'm addressing, include its thumbnails and children,
        //   and for each of the children, include its thumbnails. for those
        //   thumbnails, return the 'large' and 'c200x150_Crop' sizes"
        // we also attach the access token as a query parameter to every request.
        // we could also pass it in through the 'Authorization: bearer' header,
        // but that would result in an extra CORS preflight request for every
        // unique path.

        let odQuery = `?expand=thumbnails,children(expand=thumbnails(select=large,c200x150_Crop))&access_token=${token}`;
        return this.http.get(odUrl + odQuery).toPromise();
    }
}