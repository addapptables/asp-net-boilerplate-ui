import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { RoleService } from '../services/role.service';
import { ofAction } from '@addapptables/ngrx-actions';
import { LoadRoleMinimals, CancelRoleMinimalsRequest, RoleMinimalsLoaded } from '../actions/role-minimal.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RoleMinimalEffects {

  constructor(
    private _actions$: Actions,
    private _roleService: RoleService
  ) { }

  @Effect()
  $load = this._actions$.pipe(
    ofAction(LoadRoleMinimals),
    switchMap(() =>
      this._roleService.getAllMinimal().pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleMinimalsRequest))),
        map(result => new RoleMinimalsLoaded({ roles: result })),
        catchError(() => of(new CancelRoleMinimalsRequest()))
      )
    )
  );

}
