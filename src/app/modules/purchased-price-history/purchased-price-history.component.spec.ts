import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedPriceHistoryComponent } from './purchased-price-history.component';

describe('PurchasedPriceHistoryComponent', () => {
  let component: PurchasedPriceHistoryComponent;
  let fixture: ComponentFixture<PurchasedPriceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedPriceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
