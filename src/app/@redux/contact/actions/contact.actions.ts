import { Action } from '@ngrx/store';
import { GetContactDto } from '../models/get-contact-dto';
import { ContactDto } from '../models/contact-dto';
import { CreateContactDto } from '../models/create-contact-dto';
import { UpdateContactDto } from '../models/update-contact-dto';

export enum ContactActionTypes {
  LoadContacts = '[Contact] Load Contacts',
  ContactsLoaded = '[Contact] Contacts Loaded',
  CreateContact = '[Contact] Create Contact',
  ContactCreated = '[Contact] Contact Created',
  UpdateContact = '[Contact] Update Contact',
  ContactUpdated = '[Contact] Contact Updated',
  DeleteContact = '[Contact] Delete Contact',
  ContactDeleted = '[Contact] Contact Deleted',
  CancelContactRequest = '[Contact] Cancel Contact Request',
  ContactActionComplete = '[Contact] Contact Action Complete',
  ContactActionError = '[Contact] Contact Action Error',
  ContactClearStore = '[Contact] Contact Clear Store',
}

export class LoadContacts implements Action {
  readonly type = ContactActionTypes.LoadContacts;
  constructor(public payload: { params: GetContactDto }) { }
}

export class ContactsLoaded implements Action {
  readonly type = ContactActionTypes.ContactsLoaded;
  constructor(public payload: { contacts: ContactDto[], total: number }) { }
}

export class CreateContact implements Action {
  readonly type = ContactActionTypes.CreateContact;
  constructor(public payload: { contact: CreateContactDto }) { }
}

export class ContactCreated implements Action {
  readonly type = ContactActionTypes.ContactCreated;
  constructor(public payload: { contact: ContactDto }) { }
}

export class UpdateContact implements Action {
  readonly type = ContactActionTypes.UpdateContact;
  constructor(public payload: { contact: UpdateContactDto }) { }
}

export class ContactUpdated implements Action {
  readonly type = ContactActionTypes.ContactUpdated;
  constructor(public payload: { contact: ContactDto }) { }
}

export class DeleteContact implements Action {
  readonly type = ContactActionTypes.DeleteContact;
  constructor(public payload: { id: number }) { }
}

export class ContactDeleted implements Action {
  readonly type = ContactActionTypes.ContactDeleted;
  constructor(public payload: { id: number }) { }
}

export class CancelContactRequest implements Action {
  readonly type = ContactActionTypes.CancelContactRequest;
}

export class ContactActionComplete implements Action {
  readonly type = ContactActionTypes.ContactActionComplete;
}

export class ContactActionError implements Action {
  readonly type = ContactActionTypes.ContactActionError;
}

export class ContactClearStore implements Action {
  readonly type = ContactActionTypes.ContactClearStore;
}
