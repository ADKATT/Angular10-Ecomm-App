import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLocationsComponent } from './business-locations.component';

describe('BusinessLocationsComponent', () => {
    let component: BusinessLocationsComponent;
    let fixture: ComponentFixture<BusinessLocationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BusinessLocationsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BusinessLocationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
