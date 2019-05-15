import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateUserOrganizationUnitListComponent } from './associate-user-organization-unit-list.component';

describe('AssociateUserOrganizationUnitListComponent', () => {
  let component: AssociateUserOrganizationUnitListComponent;
  let fixture: ComponentFixture<AssociateUserOrganizationUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateUserOrganizationUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateUserOrganizationUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
