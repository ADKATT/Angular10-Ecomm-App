import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPricePendingComponent } from './ask-price-pending.component';

describe('AskPricePendingComponent', () => {
  let component: AskPricePendingComponent;
  let fixture: ComponentFixture<AskPricePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskPricePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPricePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
