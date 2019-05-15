import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PermissionService } from '../services/permission.service';
import { LoadPermissions, PermissionsLoaded, CancelLoadPermissions } from '../actions/permission.actions';
import { switchMap, catchError, map, withLatestFrom, filter, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { PermissionDto } from '../models/permission-dto.model';
import { ofAction } from '@addapptables/ngrx-actions';
import { Store, select } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectAllPermissions } from '../selectors/permission.selector';


@Injectable()
export class PermissionEffects {

  constructor(
    private _actions$: Actions,
    private _permissionService: PermissionService,
    private _store: Store<AddapptableState>
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadPermissions),
    withLatestFrom(this._store.pipe(select(selectAllPermissions))),
    filter(([_, allPermissions]) => allPermissions.length === 0),
    switchMap(() =>
      this._permissionService.getAll().pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelLoadPermissions))),
        catchError(() => of(<PermissionDto[]>[]))
      )),
    map(permissions => new PermissionsLoaded({ permissions }))
  );
}
