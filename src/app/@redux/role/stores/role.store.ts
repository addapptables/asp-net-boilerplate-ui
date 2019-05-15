import { createEntityAdapter, EntityAdapter, Update } from '@ngrx/entity';
import { RoleDto } from '../models/role-dto.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { RoleStoreModel } from '../models/role-store.model';
import {
    LoadRoles,
    RolesLoaded,
    CancelRoleRequest,
    CreateRole,
    RoleCreated,
    UpdateRole,
    RoleUpdated,
    RoleActionComplete,
    RoleActionError,
    RoleDeleted,
    DeleteRole,
    RoleClearStore
} from '../actions/role.actions';
import { ActionType } from '@redux/shared/models/action-type.model';

export const adapter: EntityAdapter<RoleDto> = createEntityAdapter<RoleDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<RoleStoreModel>(initialState)
export class RoleStore {

    @Action(LoadRoles)
    loadRoles(state: RoleStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelRoleRequest)
    cancelRoleRequest(state: RoleStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(RolesLoaded)
    rolesLoaded(state: RoleStoreModel, { payload }: RolesLoaded) {
        return adapter.upsertMany<RoleStoreModel>(payload.roles, {
            ...state,
            loading: false,
            total: payload.totalCount
        });
    }

    @Action(CreateRole)
    createRole(state: RoleStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RoleCreated)
    roleCreated(state: RoleStoreModel, { payload: { role } }: RoleCreated) {
        return adapter.addOne(role, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UpdateRole)
    updateRole(state: RoleStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RoleUpdated)
    roleUpdated(state: RoleStoreModel, { payload: { role } }: RoleUpdated) {
        const updateRole = <Update<RoleDto>>{
            id: role.id,
            changes: role
        };
        return adapter.updateOne(updateRole, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(RoleActionComplete)
    roleActionComplete(state: RoleStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(RoleActionError)
    roleActionError(state: RoleStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(DeleteRole)
    deleteRole(state: RoleStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RoleDeleted)
    roleDeleted(state: RoleStoreModel, { payload: { id } }: RoleDeleted) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.success,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(RoleClearStore)
    roleClearStore(state: RoleStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
