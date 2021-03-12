import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrudComponent } from './admin-crud.component';

describe('AdminCrudComponent', () => {
  let component: AdminCrudComponent;
  let fixture: ComponentFixture<AdminCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
