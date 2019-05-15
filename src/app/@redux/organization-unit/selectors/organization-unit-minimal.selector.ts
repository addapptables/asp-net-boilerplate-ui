import { OrganizationUnitMinimalStoreModel } from '../models/minimal/organization-unit-minimal-store.mode';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/organization-unit-minimal.store';

export const selectOrganizationUnitMinimalState = state => <OrganizationUnitMinimalStoreModel>state.organizationUnitMinimal.store;

export const selectAllOrganizationUnitsMinimal = createSelector(
    selectOrganizationUnitMinimalState,
    selectAll
);

export const selectOrganizationUnitsMinimalLoading = createSelector(
    selectOrganizationUnitMinimalState,
    state => state.loading
);
