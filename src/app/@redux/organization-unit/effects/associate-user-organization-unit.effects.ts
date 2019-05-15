import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import {
  LoadAssociateUserOrganizationUnits,
  CancelAssociateUserOrganizationUnitRequest,
  AssociateUserOrganizationUnitsLoaded
} from '../actions/associate-user-organization-unit.actions';
import { ofAction } from '@addapptables/ngrx-actions';
import { map, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { AssociateUserOrganizationUnitDto } from '../models/user/associate-user-organization-unit-dto';

@Injectable()
export class AssociateUserOrganizationUnitEffects {

  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadAssociateUserOrganizationUnits),
    switchMap((action) =>
      this._organizationUnitService.getUsersToAssociate(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelAssociateUserOrganizationUnitRequest))),
        catchError(() => of(<PaginatedModel<AssociateUserOrganizationUnitDto>>{ items: [], totalCount: 0 }))
      )
    ),
    map((result) => new AssociateUserOrganizationUnitsLoaded({ users: result.items, total: result.totalCount }))
  );

}
