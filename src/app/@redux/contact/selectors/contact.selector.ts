import { ContactStoreModel } from '../models/contact-store.model';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/contact.store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export const selectContactState = state => <ContactStoreModel>state.contact.store;

export const selectAllContacts = createSelector(
    selectContactState,
    selectAll
);

export const selectContactLoading = createSelector(
    selectContactState,
    state => state.loading
);

export const selectContactTotal = createSelector(
    selectContactState,
    state => state.total
);

export const selectContactsPage = (page: PageQueryModel) => createSelector(
    selectAllContacts,
    contacts => {
        const start = page.index * page.size;
        const end = start + page.size;
        return contacts.slice(start, end);
    }
);

export const selectContactLoadingAction = createSelector(
    selectContactState,
    state => state.loadingAction
);

export const selectContactActionState = createSelector(
    selectContactState,
    state => state.ActionState
);
