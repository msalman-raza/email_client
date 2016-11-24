import {Component, EventEmitter, Output } from '@angular/core';
import { Email} from "../../types/email";
import { EmailService} from "../../service/email.service";

@Component({
    moduleId: module.id,
    selector   : 'email-list',
    templateUrl: 'emailList.component.html',
})
export class EmailListComponent {
    @Output() onShowDetail = new EventEmitter<Email>();

    errorMessage: string;
    public isCollapsed:boolean = false;
    public detailEmailUid:string;
    emails : Email[];

    constructor( private service:EmailService){
    }
    ngOnInit(){
        this.service.getEmails()
            .then(emails => {
                this.emails = emails
            }  )
            .catch(response => {
                this.errorMessage = response;
                console.log(response)
            });
    }
    showEmailDetail(email: Email){
        this.isCollapsed = true;
        email.isSeen = true;
        this.detailEmailUid = email.uid;
        this.onShowDetail.emit(email);
    }

    deleteEmail(email: Email){
        if(this.detailEmailUid == email.uid){
            this.onShowDetail.emit(null);
        }
        this.service.deleteEmail(email.uid);
    }
}

