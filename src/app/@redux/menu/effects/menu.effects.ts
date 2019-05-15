import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LoadMenus, MenusLoaded } from '../actions/menu.actions';
import { MenuService } from '../services/menu.service';
import { switchMap, map } from 'rxjs/operators';
import { ofAction } from '@addapptables/ngrx-actions';


@Injectable()
export class MenuEffects {

  constructor(private _actions$: Actions, private _menuService: MenuService) { }

  @Effect()
  loadMenus$ = this._actions$.pipe(
    ofAction(LoadMenus),
    switchMap(() => this._menuService.getAllMenus()),
    map(menus => new MenusLoaded({ menus }))
  );
}
