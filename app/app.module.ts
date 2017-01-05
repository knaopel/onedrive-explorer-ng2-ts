// Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback.component';
import { ContentComponent, BreadCrumbComponent } from './content.component';
import { TileComponent } from './tile.component';

// Services
import { OneDriveService } from './one-drive.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CallbackComponent,
        ContentComponent,
        BreadCrumbComponent,
        TileComponent
    ],
    providers: [OneDriveService],
    bootstrap: [AppComponent]
})
export class AppModule { }