import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { LoadOrganizationUnitMinimals, CancelOrganizationUnitMinimalsRequest, OrganizationUnitMinimalsLoaded } from '../actions/organization-unit-minimal.actions';
import { ofAction } from '@addapptables/ngrx-actions';
import { switchMap, takeUntil, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrganizationUnitMinimalEffects {
  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  @Effect()
  $load = this._actions$.pipe(
    ofAction(LoadOrganizationUnitMinimals),
    switchMap(() =>
      this._organizationUnitService.getOrganizationUnistMinimal().pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelOrganizationUnitMinimalsRequest))),
        map(result => new OrganizationUnitMinimalsLoaded({ organizationUnits: result.items })),
        catchError(() => of(new CancelOrganizationUnitMinimalsRequest()))
      )
    )
  );
}
