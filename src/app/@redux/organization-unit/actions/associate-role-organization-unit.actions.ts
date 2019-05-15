import { Action } from '@ngrx/store';
import { FindOrganizationUnitRolesDto } from '../models/role/find-organization-unit-roles-dto';
import { AssociateRoleToOrganizationUnitDto } from '../models/role/associate-role-to-organization-unit-dto';

export enum AssociateRoleOrganizationUnitActionTypes {
  LoadAssociateRoleOrganizationUnits = '[AssociateRoleOrganizationUnit] Load AssociateRoleOrganizationUnits',
  AssociateRoleOrganizationUnitsLoaded = '[AssociateRoleOrganizationUnit] AssociateRoleOrganizationUnits Loaded',
  AssociateRoleOrganizationUnitClearStore = '[AssociateRoleOrganizationUnit] AssociateRoleOrganizationUnit Clear Store',
  CancelAssociateRoleOrganizationUnitRequest = '[AssociateRoleOrganizationUnit] Cancel AssociateRoleOrganizationUnit Request',
}

export class CancelAssociateRoleOrganizationUnitRequest implements Action {
  readonly type = AssociateRoleOrganizationUnitActionTypes.CancelAssociateRoleOrganizationUnitRequest;
}

export class AssociateRoleOrganizationUnitClearStore implements Action {
  readonly type = AssociateRoleOrganizationUnitActionTypes.AssociateRoleOrganizationUnitClearStore;
}

export class LoadAssociateRoleOrganizationUnits implements Action {
  readonly type = AssociateRoleOrganizationUnitActionTypes.LoadAssociateRoleOrganizationUnits;
  constructor(public payload: { filter: FindOrganizationUnitRolesDto }) { }
}

export class AssociateRoleOrganizationUnitsLoaded implements Action {
  readonly type = AssociateRoleOrganizationUnitActionTypes.AssociateRoleOrganizationUnitsLoaded;
  constructor(public payload: { roles: AssociateRoleToOrganizationUnitDto[], total: number }) { }
}
