import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetContactDto } from '@redux/contact/models/get-contact-dto';

@Component({
  selector: 'app-contact-list-search',
  templateUrl: './contact-list-search.component.html',
  styleUrls: ['./contact-list-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListSearchComponent implements OnInit {

  form: FormGroup;

  @Output()
  search = new EventEmitter<GetContactDto>();

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      keyword: [null],
      isSupplier: [false],
      isClient: [false]
    });
  }

  submit() {
    this.search.emit(this.form.value);
  }

  clear() {
    this.form.reset({ isSupplier: false, isClient: false });
    this.search.emit(this.form.value);
  }

}
