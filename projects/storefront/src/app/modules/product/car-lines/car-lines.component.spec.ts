import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLinesComponent } from './car-lines.component';

describe('CarLinesComponent', () => {
  let component: CarLinesComponent;
  let fixture: ComponentFixture<CarLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
