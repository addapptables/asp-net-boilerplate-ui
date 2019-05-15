import { Store, Action } from '@addapptables/ngrx-actions';
import { MenuStoreModel } from '../models/menu-store.model';
import { LoadMenus, MenusLoaded } from '../actions/menu.actions';


@Store<MenuStoreModel>({
    loading: false,
    menus: []
})
export class MenuStore {

    @Action(LoadMenus)
    loadMenu(state: MenuStoreModel) {
        return { ...state, loading: true };
    }

    @Action(MenusLoaded)
    menusLoaded(state: MenuStoreModel, { payload: { menus } }: MenusLoaded) {
        return { ...state, loading: false, menus };
    }
}
