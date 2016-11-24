import { NO_ERRORS_SCHEMA, DebugElement} from "@angular/core";
import {
    ResponseOptions,
    Response,
    RequestMethod,
    XHRBackend
} from "@angular/http";
import {
    TestBed,
    async,
    fakeAsync,
    inject
} from '@angular/core/testing';
import { MockBackend, MockConnection} from "@angular/http/testing";
import { HttpModule} from "@angular/http";
import {EmailService} from "../../app/service/email.service";
import { EMAILS } from "../../app/mocks/email-mock";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

let service: any;
const mockResponse = {
    "messages": EMAILS
};
describe('Email Service: ',()=>{
    beforeEach(async(() => {
        let testBest = TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule,HttpModule ],
            providers: [ {
                provide: XHRBackend,
                useClass: MockBackend
            },EmailService ]
        });
        service = testBest.get(EmailService);
    }));


    it('should get emails', fakeAsync(
        inject([
            XHRBackend,
            EmailService
        ], (mockBackend: MockBackend, emailService: EmailService) => {
            mockEmailCall({ body: mockResponse },mockBackend);
            emailService.getEmails()
                .then(data=>{
                        expect(data.length).toBe(6)
                    }
                );
        })
    ));

    it('should handle empty data ', fakeAsync(
        inject([
            XHRBackend,
            EmailService
        ], (mockBackend: MockBackend, emailService: EmailService) => {
            mockEmailCall({ body: { "messages": []} },mockBackend);
            emailService.getEmails()
                .then(data=>{
                        expect(data.length).toBe(0)
                    }
                );
        })
    ));

    it('should handle failed getEmail ', fakeAsync(
        inject([
            XHRBackend,
            EmailService
        ], (mockBackend: MockBackend, emailService: EmailService) => {

            mockEmailCall("",mockBackend);

            emailService.getEmails()
                .then( () => expect(true).toBeFalsy() )
                .catch(() => expect(true).toBeTruthy());
        })
    ));

    it('should get and set emails ',()=>{
        service.emails = EMAILS;
        expect(service.emails.length).toBe(6);

    });

    it('should delete email ',()=>{
        service.emails = EMAILS;
        service.deleteEmail('21').then(()=>{
                expect(service.emails.length).toBe(5)
            }
        );
    });

    it('should not delete email ',()=>{
        service.emails = EMAILS;

        service.deleteEmail('11').then(()=>{
                expect(service.emails.length).toBe(5)
            }
        );
    });


});

function mockEmailCall(response: any, mockBackend: MockBackend){
    let expectedUrl = 'data/messages_sample.json';
    mockBackend.connections.subscribe(
        (connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(expectedUrl);

            connection.mockRespond(new Response(
                new ResponseOptions(response)
            ));
        });
}