import { Store, Action } from '@addapptables/ngrx-actions';
import { EditionStoreModel } from '../models/edition-store.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { EditionDto } from '../models/edition-dto.model';
import {
    LoadEditions, CancelEditionRequest, EditionsLoaded,
    CreateEdition, EditionCreated, UpdateEdition, EditionUpdated,
    EditionActionComplete, EditionActionError, DeleteEdition, EditionDeleted, EditionClearStore
} from '../actions/edition.actions';

export const adapter: EntityAdapter<EditionDto> = createEntityAdapter<EditionDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<EditionStoreModel>(initialState)
export class EditionStore {

    @Action(LoadEditions)
    loadEditions(state: EditionStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelEditionRequest)
    cancelEditionRequest(state: EditionStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(EditionsLoaded)
    editionsLoaded(state: EditionStoreModel, { payload }: EditionsLoaded) {
        return adapter.upsertMany<EditionStoreModel>(payload.editions, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(CreateEdition)
    createEdition(state: EditionStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(EditionCreated)
    editionCreated(state: EditionStoreModel, { payload: { edition } }: EditionCreated) {
        return adapter.addOne(edition, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UpdateEdition)
    updateEdition(state: EditionStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(EditionUpdated)
    editionUpdated(state: EditionStoreModel, { payload: { edition } }: EditionUpdated) {
        const update = <Update<EditionDto>>{
            id: edition.id,
            changes: edition
        };
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(EditionActionComplete)
    editionActionComplete(state: EditionStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(EditionActionError)
    editionActionError(state: EditionStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(DeleteEdition)
    deleteEdition(state: EditionStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(EditionDeleted)
    editionDeleted(state: EditionStoreModel, { payload: { id } }: EditionDeleted) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.success,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(EditionClearStore)
    userClearStore(state: EditionStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
