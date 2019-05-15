import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddapptableContainerComponent } from './addapptable-container.component';

describe('AddapptableContainerComponent', () => {
  let component: AddapptableContainerComponent;
  let fixture: ComponentFixture<AddapptableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddapptableContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddapptableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
