import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChatHistoryComponent } from './customer-chat-history.component';

describe('CustomerChatHistoryComponent', () => {
  let component: CustomerChatHistoryComponent;
  let fixture: ComponentFixture<CustomerChatHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerChatHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
