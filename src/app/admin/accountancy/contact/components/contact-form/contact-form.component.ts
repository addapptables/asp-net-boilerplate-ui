import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ContactDto } from '@redux/contact/models/contact-dto';
import { FormBase } from 'src/app/shared/forms/form-base';
import { selectContactLoadingAction, selectContactActionState } from '@redux/contact/selectors/contact.selector';
import { ContactActionComplete, CreateContact, UpdateContact } from '@redux/contact/actions/contact.actions';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { defaultSize, largeSize, emailSize } from '@redux/contact/const';
import { CreateContactDto } from '@redux/contact/models/create-contact-dto';
import { UpdateContactDto } from '@redux/contact/models/update-contact-dto';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent extends FormBase implements OnInit {

  defaultSize = defaultSize;

  largeSize = largeSize;

  emailSize = emailSize;

  formGroup: FormGroup;

  @Input()
  contactDto: ContactDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectContactLoadingAction, selectContactActionState, new ContactActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.contactDto.id],
      names: [this.contactDto.names, [UtilValidation.required, Validators.maxLength(this.defaultSize)]],
      identificationType: [this.contactDto.identificationType],
      identification: [this.contactDto.identification, Validators.maxLength(this.defaultSize)],
      address: [this.contactDto.address, Validators.maxLength(this.largeSize)],
      email: [this.contactDto.email, [Validators.email, Validators.maxLength(this.emailSize)]],
      phone: [this.contactDto.phone, [Validators.maxLength(this.defaultSize)]],
      cellPhone: [this.contactDto.cellPhone, [Validators.maxLength(this.defaultSize)]],
      isClient: [this.contactDto.isClient],
      isSupplier: [this.contactDto.isSupplier]
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    const contactDto = { ...this.formGroup.value };
    if (contactDto.id) {
      this._update(contactDto);
    } else {
      this._create(contactDto);
    }
  }

  private _create(contact: CreateContactDto) {
    this._store.dispatch(new CreateContact({ contact }));
  }

  private _update(contact: UpdateContactDto) {
    this._store.dispatch(new UpdateContact({ contact }));
  }

}
