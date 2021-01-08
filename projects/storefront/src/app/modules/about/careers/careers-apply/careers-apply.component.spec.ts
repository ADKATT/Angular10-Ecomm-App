import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersApplyComponent } from './careers-apply.component';

describe('CareersApplyComponent', () => {
  let component: CareersApplyComponent;
  let fixture: ComponentFixture<CareersApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareersApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
