import { RoleMinimalStoreModel } from '../models/role-minimal-store.model';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/role-minimal.store';

export const selectRoleMinimalState = state => <RoleMinimalStoreModel>state.roleMinimal.store;

export const selectAllRolesMinimal = createSelector(
    selectRoleMinimalState,
    selectAll
);

export const selectRolesMinimalLoading = createSelector(
    selectRoleMinimalState,
    state => state.loading
);
