import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {EmailComponent} from "./Email/email.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'email', pathMatch: 'full'},
            { path: 'email', component: EmailComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}