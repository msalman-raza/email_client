import { DebugElement}          from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import { By }  from '@angular/platform-browser';

import {EmailComponent} from "../app/Email/email.component";
import {EmailListComponent} from "../app/Email/EmailList/emailList.component";
import {EmailDetailComponent} from "../app/Email/EmailDetail/emailDetail.component";

import { EmailService} from "../app/service/email.service";
import { StubEmailService} from "../app/mocks/stubEmail.service";

import {Email} from  "../app/types/email";
import {CollapseModule} from "ng2-bootstrap/components/collapse";


let fixture:any, comp:any , de: DebugElement, el: HTMLElement, service:any;


describe('Email component ',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CollapseModule],
            declarations: [ EmailComponent, EmailListComponent, EmailDetailComponent ],
            providers: [{provide: EmailService, useClass: StubEmailService }]
        })
        .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EmailComponent);
        comp    = fixture.componentInstance;

        service = TestBed.get(EmailService);

    });

    it('should show detail ',()=>{
        comp.showDetail(service.emails[0])
        expect(comp.emailDetail['sender']).toContain("Ernest Hemingway");
    });



});