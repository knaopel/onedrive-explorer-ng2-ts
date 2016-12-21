import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback.component';
import { ContentComponent } from './content.component';

const routes: Routes = [
    { path: '', redirectTo: '/content', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'content', component: ContentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }