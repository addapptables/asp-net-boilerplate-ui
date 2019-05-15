import { Action } from '@ngrx/store';
import { MenuModel } from '@addapptables/menu';

export enum MenuActionTypes {
  LoadMenus = '[Menu] Load Menus',
  MenusLoaded = '[Menu] Menus loaded'
}

export class LoadMenus implements Action {
  readonly type = MenuActionTypes.LoadMenus;
}

export class MenusLoaded implements Action {
  readonly type = MenuActionTypes.MenusLoaded;
  constructor(public payload: { menus: MenuModel[] }) { }
}
