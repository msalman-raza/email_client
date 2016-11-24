import { DebugElement}          from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import { By }  from '@angular/platform-browser';

import {EmailDetailComponent} from "../app/Email/EmailDetail/emailDetail.component";

import { EmailService} from "../app/service/email.service";
import { StubEmailService} from "../app/mocks/stubEmail.service";

import {Email} from  "../app/types/email";


let fixture:any, comp:any , de: DebugElement, el: HTMLElement, service:any;
let email: Email;

describe('Email Detail component ',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EmailDetailComponent ],
            providers: [{provide: EmailService, useClass: StubEmailService }]
        })
        .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EmailDetailComponent);
        comp    = fixture.componentInstance;

        service = TestBed.get(EmailService);
        email = service.emails[0];
        comp.email = email;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.email-sender'));
        el = de.nativeElement;
    });

    it('should show detail ',()=>{
        fixture.detectChanges();
        expect(el.textContent).toContain(email.sender);
    });

    it('should delete email ',()=>{
        comp.deleteEmail(email);
        expect(service.emails.length).toBe(5);
    });

});