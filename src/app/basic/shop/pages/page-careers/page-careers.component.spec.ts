import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCareersComponent } from './page-careers.component';

describe('PageCareersComponent', () => {
  let component: PageCareersComponent;
  let fixture: ComponentFixture<PageCareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCareersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
