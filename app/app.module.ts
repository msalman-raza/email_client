import {NgModule,Type} from '@angular/core'
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppRoutingModule } from "./app-routing.module";

import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

import { EmailService} from "./service/email.service";

import {AppComponent} from "./app.component";
import {EmailComponent} from "./Email/email.component";
import {EmailListComponent} from "./Email/EmailList/emailList.component";
import {EmailDetailComponent} from "./Email/EmailDetail/emailDetail.component";
import { CollapseModule  } from 'ng2-bootstrap/ng2-bootstrap';



@NgModule({
    imports: [BrowserModule, FormsModule,HttpModule, AppRoutingModule, CollapseModule
    ],
    declarations: [AppComponent, EmailComponent, EmailListComponent, EmailDetailComponent],
    providers: [ EmailService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [ AppComponent]
})
export class AppModule{}
