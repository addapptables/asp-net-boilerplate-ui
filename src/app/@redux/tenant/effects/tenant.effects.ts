import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TenantService } from '../services/tenant.service';
import {
  LoadTenants, CancelTenantRequest, TenantsLoaded, CreateTenant,
  TenantCreated, TenantActionError, UpdateTenant, TenantUpdated,
  DeleteTenant, TenantDeleted
} from '../actions/tenant.actions';
import { ofAction } from '@addapptables/ngrx-actions';
import { switchMap, catchError, takeUntil, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { TenantDto } from '../models/tenant-dto.model';

@Injectable()
export class TenantEffects {

  constructor(
    private _actions$: Actions,
    private _tenantService: TenantService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadTenants),
    switchMap((action) =>
      this._tenantService.getAll(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelTenantRequest))),
        catchError(() => of(<PaginatedModel<TenantDto>>{ totalCount: 0, items: [] }))
      )
    ),
    map((result) => new TenantsLoaded({ tenants: result.items, total: result.totalCount }))
  );

  @Effect()
  $create = this._actions$.pipe(
    ofAction(CreateTenant),
    switchMap((action) =>
      this._tenantService.create(action.payload.tenant).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelTenantRequest))),
        map((tenant) => new TenantCreated({ tenant })),
        catchError(() => of(new TenantActionError()))
      )
    )
  );

  @Effect()
  $update = this._actions$.pipe(
    ofAction(UpdateTenant),
    switchMap((action) =>
      this._tenantService.update(action.payload.tenant).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelTenantRequest))),
        map((tenant) => new TenantUpdated({ tenant })),
        catchError(() => of(new TenantActionError()))
      )
    )
  );

  @Effect()
  $delete = this._actions$.pipe(
    ofAction(DeleteTenant),
    switchMap((action) =>
      this._tenantService.deleteTenant(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelTenantRequest))),
        map(() => new TenantDeleted({ id: action.payload.id })),
        catchError(() => of(new TenantActionError()))
      )
    )
  );

}
