import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@addapptables/ngrx-actions';
import { OrganizationUnitStoreModel } from '../models/organization-unit-store.model';
import {
    LoadOrganizationUnits, CancelOrganizationUnitRequest, OrganizationUnitsLoaded, CreateOrganizationUnit, OrganizationUnitCreated,
    UpdateOrganizationUnit, OrganizationUnitUpdated, OrganizationUnitActionComplete, OrganizationUnitActionError, DeleteOrganizationUnit,
    OrganizationUnitDeleted, OrganizationUnitClearStore
} from '../actions/organization-unit.actions';
import { UsersAddedToOrganizationUnitDto, UserRemovedFromOrganizationUnit } from '../actions/user-organization-unit.actions';

export const adapter: EntityAdapter<OrganizationUnitDto> = createEntityAdapter<OrganizationUnitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<OrganizationUnitStoreModel>(initialState)
export class OrganizationUnitStore {

    @Action(LoadOrganizationUnits)
    loadOrganizationUnits(state: OrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: OrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(OrganizationUnitsLoaded)
    organizationUnitsLoaded(state: OrganizationUnitStoreModel, { payload }: OrganizationUnitsLoaded) {
        return adapter.upsertMany<OrganizationUnitStoreModel>(payload.organizationUnits, {
            ...state,
            loading: false
        });
    }

    @Action(CreateOrganizationUnit)
    createOrganizationUnit(state: OrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(OrganizationUnitCreated)
    organizationUnitCreated(state: OrganizationUnitStoreModel, { payload: { organizationUnit } }: OrganizationUnitCreated) {
        return adapter.addOne(organizationUnit, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UpdateOrganizationUnit)
    updateOrganizationUnit(state: OrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(OrganizationUnitUpdated)
    organizationUnitUpdated(state: OrganizationUnitStoreModel, { payload: { organizationUnit } }: OrganizationUnitUpdated) {
        const update = <Update<OrganizationUnitDto>>{
            id: organizationUnit.id,
            changes: organizationUnit
        };
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(OrganizationUnitActionComplete)
    organizationUnitActionComplete(state: OrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(OrganizationUnitActionError)
    organizationUnitActionError(state: OrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(DeleteOrganizationUnit)
    deleteOrganizationUnit(state: OrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(OrganizationUnitDeleted)
    organizationUnitDeleted(state: OrganizationUnitStoreModel, { payload: { id } }: OrganizationUnitDeleted) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.success,
            loadingAction: false
        });
    }

    @Action(OrganizationUnitClearStore)
    organizationUnitClearStore(state: OrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state });
    }

    @Action(UsersAddedToOrganizationUnitDto)
    usersAddedToOrganizationUnitDto(state: OrganizationUnitStoreModel, { payload: { users, organizationUnitId } }: UsersAddedToOrganizationUnitDto) {
        const organizationUnit = adapter.getSelectors().selectAll(state).find(x => x.id === organizationUnitId);
        const objectUpdate = <Update<OrganizationUnitDto>>{
            id: organizationUnitId,
            changes: {
                memberCount: organizationUnit.memberCount + users.length
            }
        };
        return adapter.updateOne(objectUpdate, { ...state, loadingAction: false });
    }

    @Action(UserRemovedFromOrganizationUnit)
    userRemovedFromOrganizationUnit(state: OrganizationUnitStoreModel, { payload: { input } }: UserRemovedFromOrganizationUnit) {
        const organizationUnit = adapter.getSelectors().selectAll(state).find(x => x.id === input.organizationUnitId);
        const objectUpdate = <Update<OrganizationUnitDto>>{
            id: input.organizationUnitId,
            changes: {
                memberCount: organizationUnit.memberCount - 1
            }
        };
        return adapter.updateOne(objectUpdate, { ...state, loadingAction: false });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
