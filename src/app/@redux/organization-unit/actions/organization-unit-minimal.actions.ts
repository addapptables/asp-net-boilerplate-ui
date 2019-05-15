import { Action } from '@ngrx/store';
import { OrganizationUnitMinimalDto } from '../models/minimal/organization-unit-minimal-dto.model';

export enum OrganizationUnitMinimalActionTypes {
  LoadOrganizationUnitMinimals = '[OrganizationUnitMinimal] Load OrganizationUnitMinimals',
  OrganizationUnitMinimalsLoaded = '[OrganizationUnitMinimal] OrganizationUnitMinimals Loaded',
  CancelOrganizationUnitMinimalsRequest = '[OrganizationUnit] Cancel OrganizationUnitMinimals Request',
  OrganizationUnitMinimalClearStore = '[OrganizationUnit] OrganizationUnit Minimal Clear Store'
}

export class LoadOrganizationUnitMinimals implements Action {
  readonly type = OrganizationUnitMinimalActionTypes.LoadOrganizationUnitMinimals;
}

export class OrganizationUnitMinimalsLoaded implements Action {
  readonly type = OrganizationUnitMinimalActionTypes.OrganizationUnitMinimalsLoaded;
  constructor(public payload: { organizationUnits: OrganizationUnitMinimalDto[] }) { }
}

export class CancelOrganizationUnitMinimalsRequest implements Action {
  readonly type = OrganizationUnitMinimalActionTypes.CancelOrganizationUnitMinimalsRequest;
}

export class OrganizationUnitMinimalClearStore implements Action {
  readonly type = OrganizationUnitMinimalActionTypes.OrganizationUnitMinimalClearStore;
}

