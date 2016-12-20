import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OneDriveService } from './one-drive.service';

@NgModule({
    imports: [BrowserModule,
        HttpModule],
    declarations: [AppComponent],
    providers: [OneDriveService],
    bootstrap: [AppComponent]
})
export class AppModule { }