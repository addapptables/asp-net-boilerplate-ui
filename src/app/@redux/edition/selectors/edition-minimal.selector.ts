import { EditionMinimalStoreModel } from '../models/edition-minimal-store.model';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/edition-minimal.store';


export const selectEditionMinimalState = state => <EditionMinimalStoreModel>state.editionMinimal.store;

export const selectAllEditionsMinimal = createSelector(
    selectEditionMinimalState,
    selectAll
);

export const selectEditionsMinimalLoading = createSelector(
    selectEditionMinimalState,
    state => state.loading
);
