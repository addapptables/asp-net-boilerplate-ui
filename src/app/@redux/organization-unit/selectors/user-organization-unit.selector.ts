import { UserOrganizationUnitStoreModel } from '../models/user/user-organization-unit-store.model';
import { selectAll } from '../stores/user-organization-unit.store';
import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';


export const selectUserOrganizationUnitState = state => <UserOrganizationUnitStoreModel>state.userOrganizationUnit.store;

export const selectAllUserOrganizationUnits = createSelector(
    selectUserOrganizationUnitState,
    selectAll
);

export const selectUserOrganizationUnitLoading = createSelector(
    selectUserOrganizationUnitState,
    state => state.loading
);

export const selectUserOrganizationUnitLoadingAction = createSelector(
    selectUserOrganizationUnitState,
    state => state.loadingAction
);

export const selectUserOrganizationUnitActionState = createSelector(
    selectUserOrganizationUnitState,
    state => state.ActionState
);

export const selectUserOrganizationUnitTotal = createSelector(
    selectUserOrganizationUnitState,
    state => state.total
);

export const selectUserOrganizationUnitsPage = (organizationUnitId: number) => (page: PageQueryModel) => createSelector(
    selectAllUserOrganizationUnits,
    userOrganizationUnit => {
        const start = page.index * page.size;
        const end = start + page.size;
        return userOrganizationUnit.filter(x => x.organizationUnitId === organizationUnitId).slice(start, end);
    }
);
