import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPriceComponent } from './ask-price.component';

describe('AskPriceComponent', () => {
  let component: AskPriceComponent;
  let fixture: ComponentFixture<AskPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
