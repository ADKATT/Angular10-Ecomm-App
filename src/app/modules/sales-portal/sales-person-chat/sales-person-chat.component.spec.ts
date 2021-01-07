import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonChatComponent } from './sales-person-chat.component';

describe('SalesPersonChatComponent', () => {
  let component: SalesPersonChatComponent;
  let fixture: ComponentFixture<SalesPersonChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPersonChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPersonChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
