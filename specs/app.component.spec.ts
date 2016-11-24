import {DebugElement}          from '@angular/core';
import { TestBed, async} from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { RouterTestingModule} from "@angular/router/testing"

import {AppComponent} from "../app/app.component";


let fixture:any, comp:any , de: DebugElement, el: HTMLElement;


describe('App component ',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [RouterTestingModule]
        })
        .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('.navbar-brand'));
        el = de.nativeElement;
    });

    it('should display orignal title',()=>{
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.webTitle);
    });



});