import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { AssociateUserOrganizationUnitStoreModel } from '../models/user/associate-user-organization-unit-store';
import {
    LoadAssociateUserOrganizationUnits,
    AssociateUserOrganizationUnitsLoaded,
    AssociateUserOrganizationUnitClearStore
} from '../actions/associate-user-organization-unit.actions';
import { CancelOrganizationUnitRequest } from '../actions/organization-unit.actions';
import { AssociateUserOrganizationUnitDto } from '../models/user/associate-user-organization-unit-dto';

export const adapter: EntityAdapter<AssociateUserOrganizationUnitDto> = createEntityAdapter<AssociateUserOrganizationUnitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<AssociateUserOrganizationUnitStoreModel>(initialState)
export class AssociateUserOrganizationUnitStore {

    @Action(LoadAssociateUserOrganizationUnits)
    loadAssociateUserOrganizationUnits(state: AssociateUserOrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: AssociateUserOrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(AssociateUserOrganizationUnitsLoaded)
    organizationUnitsLoaded(state: AssociateUserOrganizationUnitStoreModel, { payload }: AssociateUserOrganizationUnitsLoaded) {
        return adapter.upsertMany<AssociateUserOrganizationUnitStoreModel>(payload.users, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(AssociateUserOrganizationUnitClearStore)
    userOrganizationUnitClearStore(state: AssociateUserOrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
