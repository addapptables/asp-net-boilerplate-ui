import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { ContactActionService } from '../../services/contact-action.service';
import { ContactClearStore } from '@redux/contact/actions/contact.actions';
import { ContactDto } from '@redux/contact/models/contact-dto';

@Component({
  selector: 'app-contact-layout',
  templateUrl: './contact-layout.component.html',
  styleUrls: ['./contact-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactLayoutComponent implements OnDestroy {

  private _actionsDestroy: Action[];

  constructor(
    private _store: Store<AddapptableState>,
    private _contactActionService: ContactActionService
  ) {
    this._actionsDestroy = [
      new ContactClearStore()
    ];
  }

  createContact() {
    this._contactActionService.openModalUpsert(<ContactDto>{});
  }

  ngOnDestroy(): void {
    this._actionsDestroy.forEach(x => this._store.dispatch(x));
  }

}
