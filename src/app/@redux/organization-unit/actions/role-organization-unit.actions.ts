import { Action } from '@ngrx/store';
import { OrganizationUnitRolesListDto } from '../models/role/organization-unit-roles-list-dto';
import { RolesToOrganizationUnitDto } from '../models/role/roles-to-organization-unit-dto';
import { GetOrganizationUnitRolesDto } from '../models/role/get-organization-unit-roles-dto';
import { RoleToOrganizationUnitDto } from '../models/role/role-to-organization-unit-dto';

export enum RoleOrganizationUnitActionTypes {
  LoadRoleOrganizationUnits = '[RoleOrganizationUnit] Load RoleOrganizationUnits',
  RoleOrganizationUnitsLoaded = '[RoleOrganizationUnit] RoleOrganizationUnits Loaded',
  RoleOrganizationUnitClearStore = '[RoleOrganizationUnit] RoleOrganizationUnit Clear Store',
  CancelRoleOrganizationUnitRequest = '[RoleOrganizationUnit] Cancel RoleOrganizationUnit Request',
  AddRolesToOrganizationUnit = '[RoleOrganizationUnit] OrganizationUnit AddRoles',
  RolesAddedToOrganizationUnitDto = '[RoleOrganizationUnit] RolesAdded OrganizationUnit',
  RoleOrganizationUnitActionComplete = '[RoleOrganizationUnit] RoleOrganizationUnit Action Complete',
  RoleOrganizationUnitActionError = '[RoleOrganizationUnit] RoleOrganizationUnit Action Error',
  RemoveRoleFromOrganizationUnit = '[RoleOrganizationUnit] Remove RoleFromOrganizationUnit',
  RoleRemovedFromOrganizationUnit = '[RoleOrganizationUnit] RoleRemovedFromOrganizationUnit',
}

export class RemoveRoleFromOrganizationUnit implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RemoveRoleFromOrganizationUnit;
  constructor(public payload: { input: RoleToOrganizationUnitDto }) { }
}

export class RoleRemovedFromOrganizationUnit implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RoleRemovedFromOrganizationUnit;
  constructor(public payload: { input: RoleToOrganizationUnitDto }) { }
}

export class RoleOrganizationUnitActionComplete implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RoleOrganizationUnitActionComplete;
}

export class RoleOrganizationUnitActionError implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RoleOrganizationUnitActionError;
}

export class RolesAddedToOrganizationUnitDto implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RolesAddedToOrganizationUnitDto;
  constructor(public payload: { roles: OrganizationUnitRolesListDto[], organizationUnitId: number }) { }
}

export class AddRolesToOrganizationUnit implements Action {
  readonly type = RoleOrganizationUnitActionTypes.AddRolesToOrganizationUnit;
  constructor(public payload: { input: RolesToOrganizationUnitDto }) { }
}

export class CancelRoleOrganizationUnitRequest implements Action {
  readonly type = RoleOrganizationUnitActionTypes.CancelRoleOrganizationUnitRequest;
}

export class RoleOrganizationUnitClearStore implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RoleOrganizationUnitClearStore;
}

export class LoadRoleOrganizationUnits implements Action {
  readonly type = RoleOrganizationUnitActionTypes.LoadRoleOrganizationUnits;
  constructor(public payload: { filter: GetOrganizationUnitRolesDto }) { }
}

export class RoleOrganizationUnitsLoaded implements Action {
  readonly type = RoleOrganizationUnitActionTypes.RoleOrganizationUnitsLoaded;
  constructor(public payload: { roleOrganizationUnits: OrganizationUnitRolesListDto[], total: number }) { }
}
