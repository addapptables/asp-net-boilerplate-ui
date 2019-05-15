import { Action } from '@ngrx/store';
import { RoleDto } from '../models/role-dto.model';
import { RoleInputModel } from '../models/role-input.model';
import { CreateRoleDto } from '../models/create-role-dto';
import { RoleEditDto } from '../models/role-edit-dto';

export enum RoleActionTypes {
  LoadRoles = '[Role] Load Roles',
  CancelRoleRequest = '[Role] Cancel Role Request',
  RolesLoaded = '[Role] RolesLoaded',
  CreateRole = '[Role] Create Role',
  RoleCreated = '[Role] Role created',
  UpdateRole = '[Role] Update Role',
  RoleUpdated = '[Role] Role Updated',
  RoleActionComplete = '[Role] Role Action Complete',
  RoleActionError = '[Role] Role Action Error',
  DeleteRole = '[Role] Delete Role',
  RoleDeleted = '[Role] Role Deleted',
  RoleClearStore = '[Role] Role Clear Store'
}

export class LoadRoles implements Action {
  readonly type = RoleActionTypes.LoadRoles;
  constructor(public payload: { params: RoleInputModel }) { }
}

export class CancelRoleRequest implements Action {
  readonly type = RoleActionTypes.CancelRoleRequest;
}

export class RolesLoaded implements Action {
  readonly type = RoleActionTypes.RolesLoaded;
  constructor(public payload: { roles: RoleDto[], totalCount: number }) { }
}

export class CreateRole implements Action {
  readonly type = RoleActionTypes.CreateRole;
  constructor(public payload: { role: CreateRoleDto }) { }
}

export class RoleCreated implements Action {
  readonly type = RoleActionTypes.RoleCreated;
  constructor(public payload: { role: RoleDto }) { }
}

export class UpdateRole implements Action {
  readonly type = RoleActionTypes.UpdateRole;
  constructor(public payload: { role: RoleEditDto }) { }
}

export class RoleUpdated implements Action {
  readonly type = RoleActionTypes.RoleUpdated;
  constructor(public payload: { role: RoleDto }) { }
}

export class RoleActionComplete implements Action {
  readonly type = RoleActionTypes.RoleActionComplete;
}

export class RoleActionError implements Action {
  readonly type = RoleActionTypes.RoleActionError;
}

export class DeleteRole implements Action {
  readonly type = RoleActionTypes.DeleteRole;
  constructor(public payload: { id: number }) { }
}

export class RoleDeleted implements Action {
  readonly type = RoleActionTypes.RoleDeleted;
  constructor(public payload: { id: number }) { }
}

export class RoleClearStore implements Action {
  readonly type = RoleActionTypes.RoleClearStore;
}

export type RoleActions = LoadRoles;
