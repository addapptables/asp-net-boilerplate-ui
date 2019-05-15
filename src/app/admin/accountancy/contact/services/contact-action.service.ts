import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { ModalService } from '@addapptables/modal';
import { ContactActionComplete, DeleteContact } from '@redux/contact/actions/contact.actions';
import { selectContactActionState } from '@redux/contact/selectors/contact.selector';
import { ContactDto } from '@redux/contact/models/contact-dto';
import { ContactFormModalComponent } from '../components/contact-form-modal/contact-form-modal.component';

@Injectable()
export class ContactActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new ContactActionComplete(), selectContactActionState);
  }

  openModalUpsert(contact: ContactDto) {
    this._modalService.show(ContactFormModalComponent, contact);
  }

  deleteContact(contact: ContactDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('contact.areYouSure', { title: contact.names }),
      new DeleteContact({ id: contact.id })
    );
  }
}
