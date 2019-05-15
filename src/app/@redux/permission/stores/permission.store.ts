import { PermissionStoreModel } from '../models/permission-store.model';
import { LoadPermissions, PermissionsLoaded } from '../actions/permission.actions';
import { Store, Action } from '@addapptables/ngrx-actions';


@Store<PermissionStoreModel>({
    loading: false,
    permissions: []
})
export class PermissionStore {

    @Action(LoadPermissions)
    loadPermissions(state: PermissionStoreModel) {
        return { ...state, loading: true };
    }

    @Action(PermissionsLoaded)
    permissionsLoaded(state: PermissionStoreModel, { payload: { permissions } }: PermissionsLoaded) {
        return { ...state, permissions, loading: false };
    }

}
