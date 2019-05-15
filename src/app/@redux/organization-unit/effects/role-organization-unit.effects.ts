import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { ofAction } from '@addapptables/ngrx-actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import {
  LoadRoleOrganizationUnits,
  CancelRoleOrganizationUnitRequest,
  RoleOrganizationUnitsLoaded,
  AddRolesToOrganizationUnit,
  RolesAddedToOrganizationUnitDto,
  RoleOrganizationUnitActionError,
  RemoveRoleFromOrganizationUnit,
  RoleRemovedFromOrganizationUnit
} from '../actions/role-organization-unit.actions';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { OrganizationUnitRolesListDto } from '../models/role/organization-unit-roles-list-dto';

@Injectable()
export class RoleOrganizationUnitEffects {

  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadRoleOrganizationUnits),
    switchMap((action) =>
      this._organizationUnitService.getRolesOrganizationUnit(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleOrganizationUnitRequest))),
        catchError(() => of(<PaginatedModel<OrganizationUnitRolesListDto>>{ items: [], totalCount: 0 }))
      )
    ),
    map((result) => new RoleOrganizationUnitsLoaded({ roleOrganizationUnits: result.items, total: result.totalCount }))
  );

  @Effect()
  $addRoleToOrganizationUnit = this._actions$.pipe(
    ofAction(AddRolesToOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.addRoleToOrganizationUnit(action.payload.input).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleOrganizationUnitRequest))),
        map((result) => new RolesAddedToOrganizationUnitDto({ roles: result.items, organizationUnitId: action.payload.input.organizationUnitId })),
        catchError(() => of(new RoleOrganizationUnitActionError()))
      )
    )
  );

  @Effect()
  $removeRoleToOrganizationUnit = this._actions$.pipe(
    ofAction(RemoveRoleFromOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.removeRoleToOrganizationUnit(action.payload.input).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelRoleOrganizationUnitRequest))),
        map(() => new RoleRemovedFromOrganizationUnit(action.payload)),
        catchError(() => of(new RoleOrganizationUnitActionError()))
      )
    )
  );

}
