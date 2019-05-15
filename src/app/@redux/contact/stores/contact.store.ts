import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { ContactDto } from '../models/contact-dto';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { ContactStoreModel } from '../models/contact-store.model';
import {
    LoadContacts,
    CancelContactRequest,
    ContactsLoaded,
    CreateContact,
    ContactCreated,
    UpdateContact,
    ContactUpdated,
    ContactActionComplete,
    ContactActionError,
    DeleteContact,
    ContactDeleted,
    ContactClearStore
} from '../actions/contact.actions';

export const adapter: EntityAdapter<ContactDto> = createEntityAdapter<ContactDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<ContactStoreModel>(initialState)
export class ContactStore {

    @Action(LoadContacts)
    loadContacts(state: ContactStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelContactRequest)
    cancelContactRequest(state: ContactStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(ContactsLoaded)
    contactsLoaded(state: ContactStoreModel, { payload }: ContactsLoaded) {
        return adapter.upsertMany<ContactStoreModel>(payload.contacts, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(CreateContact)
    createContact(state: ContactStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ContactCreated)
    contactCreated(state: ContactStoreModel, { payload: { contact } }: ContactCreated) {
        return adapter.addOne(contact, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UpdateContact)
    updateContact(state: ContactStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ContactUpdated)
    contactUpdated(state: ContactStoreModel, { payload: { contact } }: ContactUpdated) {
        const update = <Update<ContactDto>>{
            id: contact.id,
            changes: contact
        };
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(ContactActionComplete)
    contactActionComplete(state: ContactStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(ContactActionError)
    contactActionError(state: ContactStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(DeleteContact)
    deleteContact(state: ContactStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ContactDeleted)
    contactDeleted(state: ContactStoreModel, { payload: { id } }: ContactDeleted) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.success,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(ContactClearStore)
    contactClearStore(state: ContactStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
