import { Action } from '@ngrx/store';
import { PermissionDto } from '../models/permission-dto.model';

export enum PermissionActionTypes {
  LoadPermissions = '[Permission] Load Permissions',
  CancelLoadPermissions = '[Permission] Cancel Load Permissions',
  PermissionsLoaded = '[Permission] Permissions Loaded'
}

export class LoadPermissions implements Action {
  readonly type = PermissionActionTypes.LoadPermissions;
}

export class CancelLoadPermissions implements Action {
  readonly type = PermissionActionTypes.CancelLoadPermissions;
}

export class PermissionsLoaded implements Action {
  readonly type = PermissionActionTypes.PermissionsLoaded;
  constructor(public payload: { permissions: PermissionDto[] }) { }
}

export type PermissionActions = LoadPermissions;
