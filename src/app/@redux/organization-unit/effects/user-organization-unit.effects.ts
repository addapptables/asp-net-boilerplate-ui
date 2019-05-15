import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadUserOrganizationUnits,
  CancelUserOrganizationUnitRequest,
  UserOrganizationUnitsLoaded,
  AddUsersToOrganizationUnit,
  UserOrganizationUnitActionError,
  UsersAddedToOrganizationUnitDto,
  RemoveUserFromOrganizationUnit,
  UserRemovedFromOrganizationUnit
} from '../actions/user-organization-unit.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { UserOrganizationUnitDto } from '../models/user/user-organization-unit-dto';

@Injectable()
export class UserOrganizationUnitEffects {

  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadUserOrganizationUnits),
    switchMap((action) =>
      this._organizationUnitService.getUserOrganizationUnit(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserOrganizationUnitRequest))),
        catchError(() => of(<PaginatedModel<UserOrganizationUnitDto>>{ items: [], totalCount: 0 }))
      )
    ),
    map((result) => new UserOrganizationUnitsLoaded({ userOrganizationUnits: result.items, total: result.totalCount }))
  );

  @Effect()
  $addUserToOrganizationUnit = this._actions$.pipe(
    ofAction(AddUsersToOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.addUserToOrganizationUnit(action.payload.input).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserOrganizationUnitRequest))),
        map((result) => new UsersAddedToOrganizationUnitDto({ users: result.items, organizationUnitId: action.payload.input.organizationUnitId })),
        catchError(() => of(new UserOrganizationUnitActionError()))
      )
    )
  );

  @Effect()
  $removeUserToOrganizationUnit = this._actions$.pipe(
    ofAction(RemoveUserFromOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.removeUserToOrganizationUnit(action.payload.input).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserOrganizationUnitRequest))),
        map(() => new UserRemovedFromOrganizationUnit(action.payload)),
        catchError(() => of(new UserOrganizationUnitActionError()))
      )
    )
  );

}
