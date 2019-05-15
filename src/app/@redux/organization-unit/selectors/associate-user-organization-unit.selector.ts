import { AssociateUserOrganizationUnitStoreModel } from '../models/user/associate-user-organization-unit-store';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/associate-user-organization-unit.store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';


export const selectAssociateUserOrganizationUnitState = state =>
    <AssociateUserOrganizationUnitStoreModel>state.associateUserOrganizationUnit.store;

export const selectAllAssociateUserOrganizationUnits = createSelector(
    selectAssociateUserOrganizationUnitState,
    selectAll
);

export const selectAssociateUserOrganizationUnitLoading = createSelector(
    selectAssociateUserOrganizationUnitState,
    state => state.loading
);

export const selectAssociateUserOrganizationUnitLoadingAction = createSelector(
    selectAssociateUserOrganizationUnitState,
    state => state.loadingAction
);

export const selectAssociateUserOrganizationUnitActionState = createSelector(
    selectAssociateUserOrganizationUnitState,
    state => state.ActionState
);

export const selectAssociateUserOrganizationUnitTotal = createSelector(
    selectAssociateUserOrganizationUnitState,
    state => state.total
);

export const selectAssociateUserOrganizationUnitsPage = (organizationUnitId: number) => (page: PageQueryModel) => createSelector(
    selectAllAssociateUserOrganizationUnits,
    userOrganizationUnit => {
        const start = page.index * page.size;
        const end = start + page.size;
        return userOrganizationUnit.filter(x => x.organizationUnitId === organizationUnitId).slice(start, end);
    }
);
