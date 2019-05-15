import { Store, Action } from '@addapptables/ngrx-actions';
import { RoleMinimalStoreModel } from '../models/role-minimal-store.model';
import { RoleMinimalsLoaded, LoadRoleMinimals, CancelRoleMinimalsRequest, RoleMinimalClearStore } from '../actions/role-minimal.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RoleMinimalDto } from '../models/role-minimal-dto';

export const adapter: EntityAdapter<RoleMinimalDto> = createEntityAdapter<RoleMinimalDto>();

const initialState = adapter.getInitialState({
    loading: false
});

@Store<RoleMinimalStoreModel>(initialState)
export class RoleMinimalStore {

    @Action(LoadRoleMinimals)
    loadRoleMinimals(state: RoleMinimalStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelRoleMinimalsRequest)
    cancelRoleMinimalsRequest(state: RoleMinimalStoreModel) {
        return { ...state, loading: false };
    }

    @Action(RoleMinimalsLoaded)
    roleMinimalsLoaded(state: RoleMinimalStoreModel, { payload: { roles } }: RoleMinimalsLoaded) {
        return adapter.addMany<RoleMinimalStoreModel>(roles, {
            ...state,
            loading: false
        });
    }

    @Action(RoleMinimalClearStore)
    roleMinimalClearStore(state: RoleMinimalStoreModel) {
        return adapter.removeAll({ ...state, loading: false });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
