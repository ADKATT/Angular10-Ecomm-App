import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRadioComponent } from './filter-radio.component';

describe('FilterRadioComponent', () => {
    let component: FilterRadioComponent;
    let fixture: ComponentFixture<FilterRadioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FilterRadioComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterRadioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
