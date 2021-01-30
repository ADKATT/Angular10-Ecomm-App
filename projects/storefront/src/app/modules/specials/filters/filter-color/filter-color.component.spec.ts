import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterColorComponent } from './filter-color.component';

describe('FilterColorComponent', () => {
    let component: FilterColorComponent;
    let fixture: ComponentFixture<FilterColorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FilterColorComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterColorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
