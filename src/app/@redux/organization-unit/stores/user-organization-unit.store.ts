import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserOrganizationUnitDto } from '../models/user/user-organization-unit-dto';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { UserOrganizationUnitStoreModel } from '../models/user/user-organization-unit-store.model';
import {
    LoadUserOrganizationUnits,
    UserOrganizationUnitsLoaded,
    UserOrganizationUnitClearStore,
    UserOrganizationUnitActionComplete,
    UserOrganizationUnitActionError,
    AddUsersToOrganizationUnit,
    UsersAddedToOrganizationUnitDto,
    RemoveUserFromOrganizationUnit,
    UserRemovedFromOrganizationUnit
} from '../actions/user-organization-unit.actions';
import { CancelOrganizationUnitRequest } from '../actions/organization-unit.actions';

export const adapter: EntityAdapter<UserOrganizationUnitDto> = createEntityAdapter<UserOrganizationUnitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<UserOrganizationUnitStoreModel>(initialState)
export class UserOrganizationUnitStore {

    @Action(LoadUserOrganizationUnits)
    loadUserOrganizationUnits(state: UserOrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: UserOrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(UserOrganizationUnitsLoaded)
    organizationUnitsLoaded(state: UserOrganizationUnitStoreModel, { payload }: UserOrganizationUnitsLoaded) {
        return adapter.upsertMany<UserOrganizationUnitStoreModel>(payload.userOrganizationUnits, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(UserOrganizationUnitClearStore)
    userOrganizationUnitClearStore(state: UserOrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }

    @Action(UserOrganizationUnitActionComplete)
    userOrganizationUnitActionComplete(state: UserOrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(UserOrganizationUnitActionError)
    userOrganizationUnitActionError(state: UserOrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(AddUsersToOrganizationUnit)
    addUsersToOrganizationUnit(state: UserOrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UsersAddedToOrganizationUnitDto)
    usersAddedToOrganizationUnitDto(state: UserOrganizationUnitStoreModel, { payload: { users } }: UsersAddedToOrganizationUnitDto) {
        return adapter.addMany(users, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success,
            total: state.total + users.length
        });
    }

    @Action(RemoveUserFromOrganizationUnit)
    removeUserFromOrganizationUnit(state: UserOrganizationUnitStoreModel) {
        return { ...state, loadingAction: true, total: state.total - 1 };
    }

    @Action(UserRemovedFromOrganizationUnit)
    userRemovedFromOrganizationUnit(state: UserOrganizationUnitStoreModel, { payload: { input } }: UserRemovedFromOrganizationUnit) {
        return adapter.removeOne(input.id, { ...state, loadingAction: false, ActionState: ActionType.success });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
