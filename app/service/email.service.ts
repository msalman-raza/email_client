import {Injectable} from "@angular/core";
import { Http, Response } from '@angular/http';

import {Email} from  "../types/email";

@Injectable()
export class EmailService {
    private dataUrl: string;
    private _emails: Email[];

    constructor (private http: Http) {
        this.dataUrl = 'data/messages_sample.json';
    }

    get emails(): Email[]{
        return this._emails;
    }
    set emails(emails: Email[]){
        this._emails = emails;
    }

    getEmails ():Promise< Email[] > {
        return this.http.get(this.dataUrl)
            .toPromise()
            .then(
                (res: Response)=>this.emails = this.extractEmails(res))
            .catch(this.handleError);
    }
    private extractEmails(res: Response): Email[] {
        let body = res.json();
        return body.messages || { } ;
    }
    private handleError (error: Response | any) {
        let body = error.json();
        return Promise.reject(body || { });
    }
    deleteEmail(uid:string): Promise<boolean>{
        this.emails.forEach((email, index) => {
            if (email.uid === uid) {
                this.emails.splice(index, 1);
                return Promise.resolve(true);
            }
        });
        return Promise.resolve(false);
    }
}