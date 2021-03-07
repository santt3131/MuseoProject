import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFooterComponent } from './activity-footer.component';

describe('ActivityFooterComponent', () => {
  let component: ActivityFooterComponent;
  let fixture: ComponentFixture<ActivityFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
