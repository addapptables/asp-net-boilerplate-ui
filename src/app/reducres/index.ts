import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

export interface AddapptableState {

}

export const reducers: ActionReducerMap<AddapptableState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AddapptableState>[] = !environment.production ? [storeFreeze] : [];
