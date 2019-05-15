import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { TenantDto } from '../models/tenant-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { TenantStoreModel } from '../models/tenant-store.model';
import {
    LoadTenants, CancelTenantRequest, TenantsLoaded, CreateTenant, TenantCreated,
    UpdateTenant, TenantUpdated, TenantActionComplete, TenantActionError, DeleteTenant,
    TenantDeleted, TenantClearStore
} from '../actions/tenant.actions';

export const adapter: EntityAdapter<TenantDto> = createEntityAdapter<TenantDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<TenantStoreModel>(initialState)
export class TenantStore {

    @Action(LoadTenants)
    loadTenants(state: TenantStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelTenantRequest)
    cancelTenantRequest(state: TenantStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(TenantsLoaded)
    tenantsLoaded(state: TenantStoreModel, { payload }: TenantsLoaded) {
        return adapter.upsertMany<TenantStoreModel>(payload.tenants, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(CreateTenant)
    createTenant(state: TenantStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(TenantCreated)
    tenantCreated(state: TenantStoreModel, { payload: { tenant } }: TenantCreated) {
        return adapter.addOne(tenant, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UpdateTenant)
    updateTenant(state: TenantStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(TenantUpdated)
    tenantUpdated(state: TenantStoreModel, { payload: { tenant } }: TenantUpdated) {
        const update = <Update<TenantDto>>{
            id: tenant.id,
            changes: tenant
        };
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(TenantActionComplete)
    tenantActionComplete(state: TenantStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(TenantActionError)
    tenantActionError(state: TenantStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(DeleteTenant)
    deleteTenant(state: TenantStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(TenantDeleted)
    tenantDeleted(state: TenantStoreModel, { payload: { id } }: TenantDeleted) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.success,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(TenantClearStore)
    tenantClearStore(state: TenantStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
