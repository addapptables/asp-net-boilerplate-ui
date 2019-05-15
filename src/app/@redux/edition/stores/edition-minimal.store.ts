import { Store, Action } from '@addapptables/ngrx-actions';
import { EditionMinimalStoreModel } from '../models/edition-minimal-store.model';
import {
    EditionMinimalsLoaded, LoadEditionMinimals,
    CancelEditionMinimalsRequest, EditionMinimalClearStore
} from '../actions/edition-minimal.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EditionMinimalDto } from '../models/edition-minimal-dto.model';

export const adapter: EntityAdapter<EditionMinimalDto> = createEntityAdapter<EditionMinimalDto>();

const initialState = adapter.getInitialState({
    loading: false
});

@Store<EditionMinimalStoreModel>(initialState)
export class EditionMinimalStore {

    @Action(LoadEditionMinimals)
    loadEditionMinimals(state: EditionMinimalStoreModel) {
        return { ...state, loading: true };
    }

    @Action(CancelEditionMinimalsRequest)
    cancelEditionMinimalsRequest(state: EditionMinimalStoreModel) {
        return { ...state, loading: false };
    }

    @Action(EditionMinimalsLoaded)
    editionMinimalsLoaded(state: EditionMinimalStoreModel, { payload: { editions } }: EditionMinimalsLoaded) {
        return adapter.addMany<EditionMinimalStoreModel>(editions, {
            ...state,
            loading: false
        });
    }

    @Action(EditionMinimalClearStore)
    editionMinimalClearStore(state: EditionMinimalStoreModel) {
        return adapter.removeAll({ ...state, loading: false });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
