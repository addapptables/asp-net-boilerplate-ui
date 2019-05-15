import { Action } from '@ngrx/store';
import { TenantDto } from '../models/tenant-dto.model';
import { UpdateTenantDto } from '../models/update-tenant-dto.model';
import { CreateTenantDto } from '../models/create-tenant-dto.model';
import { GetTenantDto } from '../models/get-tenant-dto.model';

export enum TenantActionTypes {
  LoadTenants = '[Tenant] Load Tenants',
  TenantsLoaded = '[Tenant] Tenants Loaded',
  CreateTenant = '[Tenant] Create Tenant',
  TenantCreated = '[Tenant] Tenant Created',
  UpdateTenant = '[Tenant] Update Tenant',
  TenantUpdated = '[Tenant] Tenant Updated',
  DeleteTenant = '[Tenant] Delete Tenant',
  TenantDeleted = '[Tenant] Tenant Deleted',
  TenantActionComplete = '[Tenant] Tenant Action Complete',
  TenantActionError = '[Tenant] Tenant Action Error',
  TenantClearStore = '[Tenant] Tenant Clear Store',
  CancelTenantRequest = '[Tenant] Cancel Tenant Request',
}

export class CancelTenantRequest implements Action {
  readonly type = TenantActionTypes.CancelTenantRequest;
}

export class TenantClearStore implements Action {
  readonly type = TenantActionTypes.TenantClearStore;
}

export class TenantActionError implements Action {
  readonly type = TenantActionTypes.TenantActionError;
}

export class TenantActionComplete implements Action {
  readonly type = TenantActionTypes.TenantActionComplete;
}

export class TenantDeleted implements Action {
  readonly type = TenantActionTypes.TenantDeleted;
  constructor(public payload: { id: number }) { }
}

export class DeleteTenant implements Action {
  readonly type = TenantActionTypes.DeleteTenant;
  constructor(public payload: { id: number }) { }
}

export class TenantUpdated implements Action {
  readonly type = TenantActionTypes.TenantUpdated;
  constructor(public payload: { tenant: TenantDto }) { }
}

export class UpdateTenant implements Action {
  readonly type = TenantActionTypes.UpdateTenant;
  constructor(public payload: { tenant: UpdateTenantDto }) { }
}

export class TenantCreated implements Action {
  readonly type = TenantActionTypes.TenantCreated;
  constructor(public payload: { tenant: TenantDto }) { }
}

export class CreateTenant implements Action {
  readonly type = TenantActionTypes.CreateTenant;
  constructor(public payload: { tenant: CreateTenantDto }) { }
}

export class TenantsLoaded implements Action {
  readonly type = TenantActionTypes.TenantsLoaded;
  constructor(public payload: { tenants: TenantDto[], total: number }) { }
}

export class LoadTenants implements Action {
  readonly type = TenantActionTypes.LoadTenants;
  constructor(public payload: { filter: GetTenantDto }) { }
}
