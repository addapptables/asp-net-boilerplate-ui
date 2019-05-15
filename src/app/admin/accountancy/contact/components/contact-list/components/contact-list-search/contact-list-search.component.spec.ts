import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListSearchComponent } from './contact-list-search.component';

describe('ContactListSearchComponent', () => {
  let component: ContactListSearchComponent;
  let fixture: ComponentFixture<ContactListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
