import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationUnitFormModalComponent } from './user-organization-unit-form-modal.component';

describe('UserOrganizationUnitFormModalComponent', () => {
  let component: UserOrganizationUnitFormModalComponent;
  let fixture: ComponentFixture<UserOrganizationUnitFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrganizationUnitFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrganizationUnitFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
