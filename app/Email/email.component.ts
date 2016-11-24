import {Component} from '@angular/core';
import { Email} from "../types/email";

@Component({
    moduleId: module.id,
    selector   : 'email-component',
    templateUrl: 'email.component.html',
})
export class EmailComponent {
    public emailDetail: Email;
    constructor(){

    }
    showDetail(email: Email){
        this.emailDetail = email;
    }
}
