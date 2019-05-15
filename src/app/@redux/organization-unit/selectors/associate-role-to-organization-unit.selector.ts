import { AssociateRoleToOrganizationUnitStoreModel } from '../models/role/associate-role-to-organization-unit-store';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/associate-role-to-organization-unit.store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export const selectAssociateRoleOrganizationUnitState = state =>
    <AssociateRoleToOrganizationUnitStoreModel>state.associateRoleOrganizationUnit.store;

export const selectAllAssociateRoleOrganizationUnits = createSelector(
    selectAssociateRoleOrganizationUnitState,
    selectAll
);

export const selectAssociateRoleOrganizationUnitLoading = createSelector(
    selectAssociateRoleOrganizationUnitState,
    state => state.loading
);

export const selectAssociateRoleOrganizationUnitLoadingAction = createSelector(
    selectAssociateRoleOrganizationUnitState,
    state => state.loadingAction
);

export const selectAssociateRoleOrganizationUnitActionState = createSelector(
    selectAssociateRoleOrganizationUnitState,
    state => state.ActionState
);

export const selectAssociateRoleOrganizationUnitTotal = createSelector(
    selectAssociateRoleOrganizationUnitState,
    state => state.total
);

export const selectAssociateRoleOrganizationUnitsPage = (organizationUnitId: number) => (page: PageQueryModel) => createSelector(
    selectAllAssociateRoleOrganizationUnits,
    roleOrganizationUnit => {
        const start = page.index * page.size;
        const end = start + page.size;
        return roleOrganizationUnit.filter(x => x.organizationUnitId === organizationUnitId).slice(start, end);
    }
);
