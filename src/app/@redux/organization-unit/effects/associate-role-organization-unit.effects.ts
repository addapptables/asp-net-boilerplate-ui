import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { ofAction } from '@addapptables/ngrx-actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { LoadAssociateRoleOrganizationUnits, CancelAssociateRoleOrganizationUnitRequest, AssociateRoleOrganizationUnitsLoaded } from '../actions/associate-role-organization-unit.actions';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { AssociateRoleToOrganizationUnitDto } from '../models/role/associate-role-to-organization-unit-dto';

@Injectable()
export class AssociateRoleOrganizationUnitEffects {

  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadAssociateRoleOrganizationUnits),
    switchMap((action) =>
      this._organizationUnitService.getRolesToAssociate(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelAssociateRoleOrganizationUnitRequest))),
        catchError(() => of(<PaginatedModel<AssociateRoleToOrganizationUnitDto>>{ items: [], totalCount: 0 }))
      )
    ),
    map((result) => new AssociateRoleOrganizationUnitsLoaded({ roles: result.items, total: result.totalCount }))
  );

}
