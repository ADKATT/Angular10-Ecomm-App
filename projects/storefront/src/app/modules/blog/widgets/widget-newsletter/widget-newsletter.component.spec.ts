import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewsletterComponent } from './widget-newsletter.component';

describe('WidgetNewsletterComponent', () => {
    let component: WidgetNewsletterComponent;
    let fixture: ComponentFixture<WidgetNewsletterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WidgetNewsletterComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetNewsletterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
