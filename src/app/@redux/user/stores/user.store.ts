import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { UserDto } from '../models/user-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { UserStoreModel } from '../models/user-store.model';
import {
    LoadUsers, CancelUserRequest, UsersLoaded, CreateUser, UserCreated,
    UpdateUser, UserUpdated, UserActionComplete, UserActionError, DeleteUser, UserDeleted, UserClearStore
} from '../actions/user.actions';

export const adapter: EntityAdapter<UserDto> = createEntityAdapter<UserDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<UserStoreModel>(initialState)
export class UserStore {

    @Action(LoadUsers)
    loadUsers(state: UserStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelUserRequest)
    cancelUserRequest(state: UserStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(UsersLoaded)
    usersLoaded(state: UserStoreModel, { payload }: UsersLoaded) {
        return adapter.upsertMany<UserStoreModel>(payload.users, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(CreateUser)
    createUser(state: UserStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UserCreated)
    userCreated(state: UserStoreModel, { payload: { user } }: UserCreated) {
        return adapter.addOne(user, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UpdateUser)
    updateUser(state: UserStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UserUpdated)
    userUpdated(state: UserStoreModel, { payload: { user } }: UserUpdated) {
        const update = <Update<UserDto>>{
            id: user.id,
            changes: user
        };
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UserActionComplete)
    userActionComplete(state: UserStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(UserActionError)
    userActionError(state: UserStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(DeleteUser)
    deleteUser(state: UserStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UserDeleted)
    userDeleted(state: UserStoreModel, { payload: { id } }: UserDeleted) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.success,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(UserClearStore)
    userClearStore(state: UserStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
