import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationUnitFormComponent } from './user-organization-unit-form.component';

describe('UserOrganizationUnitFormComponent', () => {
  let component: UserOrganizationUnitFormComponent;
  let fixture: ComponentFixture<UserOrganizationUnitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrganizationUnitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrganizationUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
