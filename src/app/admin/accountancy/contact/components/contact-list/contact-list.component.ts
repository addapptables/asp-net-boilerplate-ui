import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { GetContactDto } from '@redux/contact/models/get-contact-dto';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { ContactActionService } from '../../services/contact-action.service';
import { ContactDataSourceService } from '../../services/contact-data-source.service';
import { ContactClearStore } from '@redux/contact/actions/contact.actions';
import { ContactDto } from '@redux/contact/models/contact-dto';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ContactDataSourceService,
    ContactActionService
  ]
})
export class ContactListComponent extends ListComponentBase<GetContactDto> implements OnInit {

  displayedColumns: string[];

  constructor(
    private _store: Store<AddapptableState>,
    private _contactActionService: ContactActionService,
    contactDataSourceService: ContactDataSourceService
  ) {
    super(contactDataSourceService);
    this.displayedColumns = contactDataSourceService.displayedColumns;
  }

  search(filter: GetContactDto) {
    this.filter.next({ ...filter });
    this._store.dispatch(new ContactClearStore());
  }

  editContact(contact: ContactDto) {
    this._contactActionService.openModalUpsert(contact);
  }

  deleteContact(contact: ContactDto) {
    this._contactActionService.deleteContact(contact);
  }
}
