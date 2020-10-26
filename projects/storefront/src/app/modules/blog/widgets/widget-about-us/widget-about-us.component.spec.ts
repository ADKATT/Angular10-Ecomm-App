import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAboutUsComponent } from './widget-about-us.component';

describe('WidgetAboutUsComponent', () => {
    let component: WidgetAboutUsComponent;
    let fixture: ComponentFixture<WidgetAboutUsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WidgetAboutUsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetAboutUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
