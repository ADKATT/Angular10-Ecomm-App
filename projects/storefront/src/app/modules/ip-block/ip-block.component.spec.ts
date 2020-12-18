import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpBlockComponent } from './ip-block.component';

describe('IpBlockComponent', () => {
  let component: IpBlockComponent;
  let fixture: ComponentFixture<IpBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
