import {Email} from  "../../app/types/email";
import { EMAILS} from "./email-mock";
export class StubEmailService {
    private _emails: Email[];
    constructor(){
        this.emails = Object.assign([], EMAILS);
    }
    get emails(): Email[]{
        return this._emails;
    }
    set emails(emails: Email[]){
        this._emails = emails;
    }

    getEmails ():Promise< Email[] > {
        return Promise.resolve(this.emails);
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