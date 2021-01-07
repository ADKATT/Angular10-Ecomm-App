import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmailTimeComponent } from './chat-email-time.component';

describe('ChatEmailTimeComponent', () => {
  let component: ChatEmailTimeComponent;
  let fixture: ComponentFixture<ChatEmailTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatEmailTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEmailTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
