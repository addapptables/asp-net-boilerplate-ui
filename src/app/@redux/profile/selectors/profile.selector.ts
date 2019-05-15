import { ProfileStoreModel } from '../models/profile-store.model';
import { createSelector } from '@ngrx/store';

export const selectProfileState = state => <ProfileStoreModel>state.profile.store;

export const selectProfile = createSelector(
    selectProfileState,
    state => state.profile
);

export const selectProfileLoading = createSelector(
    selectProfileState,
    state => state.loading
);

export const selectProfileLoadingAction = createSelector(
    selectProfileState,
    state => state.loadingAction
);

export const selectProfileActionState = createSelector(
    selectProfileState,
    state => state.ActionState
);
