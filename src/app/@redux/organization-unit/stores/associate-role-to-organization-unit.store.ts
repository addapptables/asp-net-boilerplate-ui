import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssociateRoleToOrganizationUnitDto } from '../models/role/associate-role-to-organization-unit-dto';
import { ActionType } from '@redux/shared/models/action-type.model';
import { AssociateRoleToOrganizationUnitStoreModel } from '../models/role/associate-role-to-organization-unit-store';
import { Store, Action } from '@addapptables/ngrx-actions';
import { LoadAssociateRoleOrganizationUnits, AssociateRoleOrganizationUnitsLoaded, AssociateRoleOrganizationUnitClearStore } from '../actions/associate-role-organization-unit.actions';
import { CancelOrganizationUnitRequest } from '../actions/organization-unit.actions';

export const adapter: EntityAdapter<AssociateRoleToOrganizationUnitDto> = createEntityAdapter<AssociateRoleToOrganizationUnitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<AssociateRoleToOrganizationUnitStoreModel>(initialState)
export class AssociateRoleOrganizationUnitStore {

    @Action(LoadAssociateRoleOrganizationUnits)
    loadAssociateRoleOrganizationUnits(state: AssociateRoleToOrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: AssociateRoleToOrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(AssociateRoleOrganizationUnitsLoaded)
    organizationUnitsLoaded(state: AssociateRoleToOrganizationUnitStoreModel, { payload }: AssociateRoleOrganizationUnitsLoaded) {
        return adapter.upsertMany<AssociateRoleToOrganizationUnitStoreModel>(payload.roles, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(AssociateRoleOrganizationUnitClearStore)
    roleOrganizationUnitClearStore(state: AssociateRoleToOrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
