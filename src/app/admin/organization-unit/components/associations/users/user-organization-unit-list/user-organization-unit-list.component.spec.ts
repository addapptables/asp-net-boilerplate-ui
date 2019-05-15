import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationUnitListComponent } from './user-organization-unit-list.component';

describe('UserOrganizationUnitListComponent', () => {
  let component: UserOrganizationUnitListComponent;
  let fixture: ComponentFixture<UserOrganizationUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrganizationUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrganizationUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
