import { RoleOrganizationUnitStoreModel } from '../models/role/role-organization-unit-store.model';
import { selectAll } from '../stores/role-organization-unit.store';
import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export const selectRoleOrganizationUnitState = state => <RoleOrganizationUnitStoreModel>state.roleOrganizationUnit.store;

export const selectAllRoleOrganizationUnits = createSelector(
    selectRoleOrganizationUnitState,
    selectAll
);

export const selectRoleOrganizationUnitLoading = createSelector(
    selectRoleOrganizationUnitState,
    state => state.loading
);

export const selectRoleOrganizationUnitLoadingAction = createSelector(
    selectRoleOrganizationUnitState,
    state => state.loadingAction
);

export const selectRoleOrganizationUnitActionState = createSelector(
    selectRoleOrganizationUnitState,
    state => state.ActionState
);

export const selectRoleOrganizationUnitTotal = createSelector(
    selectRoleOrganizationUnitState,
    state => state.total
);

export const selectRoleOrganizationUnitsPage = (organizationUnitId: number) => (page: PageQueryModel) => createSelector(
    selectAllRoleOrganizationUnits,
    roleOrganizationUnit => {
        const start = page.index * page.size;
        const end = start + page.size;
        return roleOrganizationUnit.filter(x => x.organizationUnitId === organizationUnitId).slice(start, end);
    }
);
