import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionType } from '@redux/shared/models/action-type.model';
import { OrganizationUnitRolesListDto } from '../models/role/organization-unit-roles-list-dto';
import { Store, Action } from '@addapptables/ngrx-actions';
import { RoleOrganizationUnitStoreModel } from '../models/role/role-organization-unit-store.model';
import {
    LoadRoleOrganizationUnits,
    RoleOrganizationUnitsLoaded,
    RoleOrganizationUnitClearStore,
    RoleOrganizationUnitActionComplete,
    RoleOrganizationUnitActionError,
    AddRolesToOrganizationUnit,
    RolesAddedToOrganizationUnitDto,
    RemoveRoleFromOrganizationUnit,
    RoleRemovedFromOrganizationUnit
} from '../actions/role-organization-unit.actions';
import { CancelOrganizationUnitRequest } from '../actions/organization-unit.actions';

export const adapter: EntityAdapter<OrganizationUnitRolesListDto> = createEntityAdapter<OrganizationUnitRolesListDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<RoleOrganizationUnitStoreModel>(initialState)
export class RoleOrganizationUnitStore {

    @Action(LoadRoleOrganizationUnits)
    loadRoleOrganizationUnits(state: RoleOrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: RoleOrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(RoleOrganizationUnitsLoaded)
    organizationUnitsLoaded(state: RoleOrganizationUnitStoreModel, { payload }: RoleOrganizationUnitsLoaded) {
        return adapter.upsertMany<RoleOrganizationUnitStoreModel>(payload.roleOrganizationUnits, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(RoleOrganizationUnitClearStore)
    roleOrganizationUnitClearStore(state: RoleOrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }

    @Action(RoleOrganizationUnitActionComplete)
    roleOrganizationUnitActionComplete(state: RoleOrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(RoleOrganizationUnitActionError)
    roleOrganizationUnitActionError(state: RoleOrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(AddRolesToOrganizationUnit)
    addRolesToOrganizationUnit(state: RoleOrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RolesAddedToOrganizationUnitDto)
    rolesAddedToOrganizationUnitDto(state: RoleOrganizationUnitStoreModel, { payload: { roles } }: RolesAddedToOrganizationUnitDto) {
        return adapter.addMany(roles, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success,
            total: state.total + roles.length
        });
    }

    @Action(RemoveRoleFromOrganizationUnit)
    removeRoleFromOrganizationUnit(state: RoleOrganizationUnitStoreModel) {
        return { ...state, loadingAction: true, total: state.total - 1 };
    }

    @Action(RoleRemovedFromOrganizationUnit)
    roleRemovedFromOrganizationUnit(state: RoleOrganizationUnitStoreModel, { payload: { input } }: RoleRemovedFromOrganizationUnit) {
        return adapter.removeOne(input.id, { ...state, loadingAction: false, ActionState: ActionType.success });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
