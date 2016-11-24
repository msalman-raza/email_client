import {Component, Input } from '@angular/core';
import { Email} from "../../types/email";
import { EmailService} from "../../service/email.service";

@Component({
    moduleId: module.id,
    selector   : 'email-detail',
    templateUrl: 'emailDetail.component.html',
})
export class EmailDetailComponent {
    @Input() email: Email;
    constructor( private service:EmailService){
    }

    deleteEmail(email: Email){
        this.service.deleteEmail(this.email.uid);
        this.email = null;
    }
}
