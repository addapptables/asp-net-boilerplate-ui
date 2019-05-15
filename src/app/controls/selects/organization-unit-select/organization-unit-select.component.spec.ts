import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitSelectComponent } from './organization-unit-select.component';

describe('OrganizationUnitSelectComponent', () => {
  let component: OrganizationUnitSelectComponent;
  let fixture: ComponentFixture<OrganizationUnitSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUnitSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
