import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Http, Response } from '@angular/http';
import { OneDriveService } from './one-drive.service';

import 'rxjs/add/operator/switchMap';

export class Crumb {
    name: string;
    path: string;
}

@Component({
    selector: 'crumb',
    template: `
    <span> > </span> <a [href]="crumb.path">{{crumb.name}}</a>`
})
export class BreadCrumbComponent {
    @Input()
    crumb: Crumb;
}


@Component({
    selector: 'app-content',
    template: `
    <div><crumb *ngFor="let crmb of breadcrumbs" [crumb]="crmb"></crumb></div>
    <div id="od-content">
        <div id="od-items" class="od-pagecol">
            <div *ngFor="let child of data?.children" class="item folder" (click)="onTileClicked(child)">
                <img *ngIf="child.thumbnails && child.thumbnails.length > 0" [src]="child.thumbnails[0].c200x150_Crop.url" />
                <div class="nameplate">{{child.name}}</div>
            </div>
        </div>
        <div id="od-json" class="od-pagecol"><pre>{{data | json}}</pre></div>
    </div>
    `
})
export class ContentComponent implements OnInit {
    private data: any;
    private path: string;
    private breadCrumbs: Crumb[] = [];
    constructor(private router: Router, private route: ActivatedRoute, private oneDrvSvc: OneDriveService) { }
    ngOnInit(): void {
        let token = this.getTokenFromCookie();

        if (token) {
            this.route.params
                .switchMap((params: Params) => this.oneDrvSvc.getItemsForPath(token, this.setPath(params['path'])))
                .subscribe(data => {
                    // let path = params['path']
                    this.data = data.json();
                    console.log(data.json());
                    //         this.data = data.json();
                    // let decodedPath = decodeURIComponent(path);
                    // document.title = `1drv ${decodedPath}`;
                    // this.updateBreadcrumb(decodedPath);
                });
            // this.onAuthenticated(token);
        } else {
            this.router.navigate(['/login']);
        }
        // console.log(token);
    }

    // encodePath(_path: string): string {
    //     if (_path) {
    //         return encodeURIComponent(_path);
    //     } else {
    //         return '';
    //     }
    // }

    setPath(_path: string): string {
        this.path = _path;
        return _path;
    }

    getTokenFromCookie(): string {
        let cookies = document.cookie;
        let name = 'odauth=';
        let start = cookies.indexOf(name);
        if (start >= 0) {
            start += name.length;
            let end = cookies.indexOf(';', start);
            if (end < 0) {
                end = cookies.length;
            } else {
                let postCookie = cookies.substring(end);
            }

            let value = cookies.substring(start, end);
            return value;
        } else {
            return '';
        }
    }

    onTileClicked(child: any): void {
        let path = child.parentReference.path.replace(/\/drive\/root:(.*)/g, '$1');
        path = encodeURIComponent(`${path}/${child.name}`);
        this.router.navigate(['/content', path]);
        // console.log(child);
    }

    // onAuthenticated(token: string): void {
    //     let path: string = null;
    //     // we extract the onedrive path from the url fragment and we
    //     // flank it with colons to use the api's path-based addressing scheme
    //     if (window.location.hash) {
    //         path = window.location.hash.substring(1);
    //     }

    //     this.oneDrvSvc.getItemsForPath(token, path).then(data => {
    //         console.log(data.json());
    //         this.data = data.json();
    //         let decodedPath = decodeURIComponent(path);
    //         document.title = `1drv ${decodedPath}`;
    //         this.updateBreadcrumb(decodedPath);
    //     })
    // }

    updateBreadcrumb(decodedPath: string): void {
        let path = decodedPath || '';
        let paths = path.split('/');
        paths.forEach(c => {
            let cr = new Crumb();
            cr.path = c;
            cr.name = c;
            this.breadCrumbs.push(cr);
        })
    }
}