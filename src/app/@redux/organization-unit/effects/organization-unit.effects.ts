import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadOrganizationUnits, CancelOrganizationUnitRequest, OrganizationUnitsLoaded,
  CreateOrganizationUnit, OrganizationUnitCreated, OrganizationUnitActionError, UpdateOrganizationUnit,
  OrganizationUnitUpdated, DeleteOrganizationUnit, OrganizationUnitDeleted
} from '../actions/organization-unit.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ListResultDto } from '@redux/shared/models/list-result-dto';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';

@Injectable()
export class OrganizationUnitEffects {


  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadOrganizationUnits),
    switchMap(() =>
      this._organizationUnitService.getAll().pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelOrganizationUnitRequest))),
        catchError(() => of(<ListResultDto<OrganizationUnitDto>>{ items: [] }))
      )
    ),
    map((result) => new OrganizationUnitsLoaded({ organizationUnits: result.items }))
  );

  @Effect()
  $create = this._actions$.pipe(
    ofAction(CreateOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.create(action.payload.organizationUnit).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelOrganizationUnitRequest))),
        map((organizationUnit) => new OrganizationUnitCreated({ organizationUnit })),
        catchError(() => of(new OrganizationUnitActionError()))
      )
    )
  );

  @Effect()
  $update = this._actions$.pipe(
    ofAction(UpdateOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.update(action.payload.organizationUnit).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelOrganizationUnitRequest))),
        map((organizationUnit) => new OrganizationUnitUpdated({ organizationUnit })),
        catchError(() => of(new OrganizationUnitActionError()))
      )
    )
  );

  @Effect()
  $delete = this._actions$.pipe(
    ofAction(DeleteOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.deleteOrganizationUnit(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelOrganizationUnitRequest))),
        map(() => new OrganizationUnitDeleted({ id: action.payload.id })),
        catchError(() => of(new OrganizationUnitActionError()))
      )
    )
  );

}
