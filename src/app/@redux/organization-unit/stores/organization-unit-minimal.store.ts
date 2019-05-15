import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrganizationUnitMinimalDto } from '../models/minimal/organization-unit-minimal-dto.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { OrganizationUnitMinimalStoreModel } from '../models/minimal/organization-unit-minimal-store.mode';
import { LoadOrganizationUnitMinimals, CancelOrganizationUnitMinimalsRequest, OrganizationUnitMinimalsLoaded, OrganizationUnitMinimalClearStore } from '../actions/organization-unit-minimal.actions';

export const adapter: EntityAdapter<OrganizationUnitMinimalDto> = createEntityAdapter<OrganizationUnitMinimalDto>();

const initialState = adapter.getInitialState({
    loading: false
});

@Store<OrganizationUnitMinimalStoreModel>(initialState)
export class OrganizationUnitMinimalStore {

    @Action(LoadOrganizationUnitMinimals)
    loadOrganizationUnitMinimals(state: OrganizationUnitMinimalStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelOrganizationUnitMinimalsRequest)
    cancelOrganizationUnitMinimalsRequest(state: OrganizationUnitMinimalStoreModel) {
        return { ...state, loading: false };
    }

    @Action(OrganizationUnitMinimalsLoaded)
    organizationUnitMinimalsLoaded(state: OrganizationUnitMinimalStoreModel, { payload: { organizationUnits } }: OrganizationUnitMinimalsLoaded) {
        return adapter.addMany<OrganizationUnitMinimalStoreModel>(organizationUnits, {
            ...state,
            loading: false
        });
    }

    @Action(OrganizationUnitMinimalClearStore)
    organizationUnitMinimalClearStore(state: OrganizationUnitMinimalStoreModel) {
        return adapter.removeAll({ ...state, loading: false });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
