import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { RoleService } from '../services/role.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadRoles,
  RolesLoaded,
  CancelRoleRequest,
  UpdateRole,
  RoleUpdated,
  CreateRole,
  RoleCreated,
  RoleActionError,
  DeleteRole,
  RoleDeleted
} from '../actions/role.actions';
import { switchMap, catchError, map, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { RoleDto } from '../models/role-dto.model';

@Injectable()
export class RoleEffects {

  constructor(
    private _actions$: Actions,
    private _roleService: RoleService
  ) { }

  @Effect()
  $load = this._actions$.pipe(
    ofAction(LoadRoles),
    switchMap((action) =>
      this._roleService.getAll(action.payload.params).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleRequest))),
        catchError(() => of(<PaginatedModel<RoleDto>>{ totalCount: 0, items: [] }))
      )
    ),
    map(result => new RolesLoaded({ roles: result.items, totalCount: result.totalCount }))
  );

  @Effect()
  $create = this._actions$.pipe(
    ofAction(CreateRole),
    switchMap((action) =>
      this._roleService.create(action.payload.role).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleRequest))),
        map((role) => new RoleCreated({ role })),
        catchError(() => of(new RoleActionError()))
      )
    )
  );

  @Effect()
  $update = this._actions$.pipe(
    ofAction(UpdateRole),
    switchMap((action) =>
      this._roleService.update(action.payload.role).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleRequest))),
        map((role) => new RoleUpdated({ role })),
        catchError(() => of(new RoleActionError()))
      )
    )
  );

  @Effect()
  $delete = this._actions$.pipe(
    ofAction(DeleteRole),
    switchMap((action) =>
      this._roleService.deleteRole(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleRequest))),
        map(() => new RoleDeleted({ id: action.payload.id })),
        catchError(() => of(new RoleActionError()))
      )
    )
  );
}
