import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTagsComponent } from './widget-tags.component';

describe('WidgetTagsComponent', () => {
    let component: WidgetTagsComponent;
    let fixture: ComponentFixture<WidgetTagsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WidgetTagsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetTagsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
