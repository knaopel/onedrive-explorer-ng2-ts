import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div id="od-loading"></div>
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }