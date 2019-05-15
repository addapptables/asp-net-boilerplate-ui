import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationTypeSelectComponent } from './identification-type-select.component';

describe('IdentificationTypeSelectComponent', () => {
  let component: IdentificationTypeSelectComponent;
  let fixture: ComponentFixture<IdentificationTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
