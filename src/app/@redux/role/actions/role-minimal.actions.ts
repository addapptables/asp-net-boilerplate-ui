import { Action } from '@ngrx/store';
import { RoleMinimalDto } from '../models/role-minimal-dto';

export enum RoleMinimalActionTypes {
  LoadRoleMinimals = '[RoleMinimal] Load RoleMinimals',
  RoleMinimalsLoaded = '[RoleMinimal] RoleMinimals Loaded',
  CancelRoleMinimalsRequest = '[Role] Cancel RoleMinimals Request',
  RoleMinimalClearStore = '[Role] Role Minimal Clear Store'
}

export class LoadRoleMinimals implements Action {
  readonly type = RoleMinimalActionTypes.LoadRoleMinimals;
}

export class RoleMinimalsLoaded implements Action {
  readonly type = RoleMinimalActionTypes.RoleMinimalsLoaded;
  constructor(public payload: { roles: RoleMinimalDto[] }) { }
}

export class CancelRoleMinimalsRequest implements Action {
  readonly type = RoleMinimalActionTypes.CancelRoleMinimalsRequest;
}

export class RoleMinimalClearStore implements Action {
  readonly type = RoleMinimalActionTypes.RoleMinimalClearStore;
}

export type RoleMinimalActions = LoadRoleMinimals;
