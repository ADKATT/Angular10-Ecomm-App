import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignChatHistoryComponent } from './assign-chat-history.component';

describe('AssignChatHistoryComponent', () => {
  let component: AssignChatHistoryComponent;
  let fixture: ComponentFixture<AssignChatHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignChatHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
