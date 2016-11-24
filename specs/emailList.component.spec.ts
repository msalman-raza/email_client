import { DebugElement}          from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import { By }  from '@angular/platform-browser';

import {EmailListComponent} from "../app/Email/EmailList/emailList.component";

import { EmailService} from "../app/service/email.service";
import { StubEmailService} from "../app/mocks/stubEmail.service";

import {Email} from  "../app/types/email";
import {CollapseModule} from "ng2-bootstrap/components/collapse";

let fixture:any, comp:any , de: DebugElement, el: HTMLElement, service:any;
let email: Email;

describe('Email component ',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CollapseModule],
            declarations: [  EmailListComponent ],
            providers: [{provide: EmailService, useClass: StubEmailService }]
        })
        .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(EmailListComponent);
        comp    = fixture.componentInstance;
        service = TestBed.get(EmailService);
        comp.ngOnInit();
        fixture.detectChanges();
        email = service.emails[0];

    }));

    it('should show email list ',()=>{
        expect(service.emails.length).toBe(6);
    });

    it('should show email detail ',()=>{
        comp.showEmailDetail(email);
        fixture.detectChanges();
        expect(service.emails[0].isSeen).toBeTruthy();
        expect(comp.detailEmailUid).toContain(service.emails[0].uid);
    });

    it('should delete ',()=>{
        comp.deleteEmail(email);
        fixture.detectChanges();
        expect(service.emails.length).toBe(5);
    });
});