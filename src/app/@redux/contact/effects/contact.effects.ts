import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ContactService } from '../services/contact.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadContacts,
  CancelContactRequest,
  ContactsLoaded,
  CreateContact,
  ContactCreated,
  ContactActionError,
  UpdateContact,
  ContactUpdated,
  DeleteContact,
  ContactDeleted
} from '../actions/contact.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ContactDto } from '../models/contact-dto';

@Injectable()
export class ContactEffects {


  constructor(
    private _actions$: Actions,
    private _contactService: ContactService
  ) { }

  @Effect()
  $loadContacts = this._actions$.pipe(
    ofAction(LoadContacts),
    switchMap((action) =>
      this._contactService.getAll(action.payload.params).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelContactRequest))),
        catchError(() => of(<PaginatedModel<ContactDto>>{ items: [], totalCount: 0 }))
      )
    ),
    map((result) => new ContactsLoaded({ contacts: result.items, total: result.totalCount }))
  );

  @Effect()
  $create = this._actions$.pipe(
    ofAction(CreateContact),
    switchMap((action) =>
      this._contactService.create(action.payload.contact).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelContactRequest))),
        map((contact) => new ContactCreated({ contact })),
        catchError(() => of(new ContactActionError()))
      )
    )
  );

  @Effect()
  $update = this._actions$.pipe(
    ofAction(UpdateContact),
    switchMap((action) =>
      this._contactService.update(action.payload.contact).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelContactRequest))),
        map((contact) => new ContactUpdated({ contact })),
        catchError(() => of(new ContactActionError()))
      )
    )
  );

  @Effect()
  $delete = this._actions$.pipe(
    ofAction(DeleteContact),
    switchMap((action) =>
      this._contactService.deleteContact(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelContactRequest))),
        map(() => new ContactDeleted({ id: action.payload.id })),
        catchError(() => of(new ContactActionError()))
      )
    )
  );
}
