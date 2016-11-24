import {Component, AfterViewInit, ViewContainerRef} from '@angular/core';
import "./rxjs-operators";

@Component({
    moduleId: module.id,
    selector   : 'app',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;
    public webTitle:string = "Email Client";

    public constructor(viewContainerRef:ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ngAfterViewInit() {
    }
}
