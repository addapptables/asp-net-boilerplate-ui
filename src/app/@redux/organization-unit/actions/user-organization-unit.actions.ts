import { Action } from '@ngrx/store';
import { GetUserOrganizationUnitDto } from '../models/user/get-user-organization-unit-dto';
import { UserOrganizationUnitDto } from '../models/user/user-organization-unit-dto';
import { AddUsersToOrganizationUnitDto } from '../models/add-users-to-organization-unit-dto';
import { RemoveUserFromOrganizationUnitDto } from '../models/user/remove-user-from-organization-unit-dto';

export enum UserOrganizationUnitActionTypes {
  LoadUserOrganizationUnits = '[UserOrganizationUnit] Load UserOrganizationUnits',
  UserOrganizationUnitsLoaded = '[UserOrganizationUnit] UserOrganizationUnits Loaded',
  UserOrganizationUnitClearStore = '[UserOrganizationUnit] UserOrganizationUnit Clear Store',
  CancelUserOrganizationUnitRequest = '[UserOrganizationUnit] Cancel UserOrganizationUnit Request',
  AddUsersToOrganizationUnit = '[UserOrganizationUnit] OrganizationUnit AddUsers',
  UsersAddedToOrganizationUnitDto = '[UserOrganizationUnit] UsersAdded OrganizationUnit',
  UserOrganizationUnitActionComplete = '[UserOrganizationUnit] UserOrganizationUnit Action Complete',
  UserOrganizationUnitActionError = '[UserOrganizationUnit] UserOrganizationUnit Action Error',
  RemoveUserFromOrganizationUnit = '[UserOrganizationUnit] Remove UserFromOrganizationUnit',
  UserRemovedFromOrganizationUnit = '[UserOrganizationUnit] UserRemovedFromOrganizationUnit',
}

export class RemoveUserFromOrganizationUnit implements Action {
  readonly type = UserOrganizationUnitActionTypes.RemoveUserFromOrganizationUnit;
  constructor(public payload: { input: RemoveUserFromOrganizationUnitDto }) { }
}

export class UserRemovedFromOrganizationUnit implements Action {
  readonly type = UserOrganizationUnitActionTypes.UserRemovedFromOrganizationUnit;
  constructor(public payload: { input: RemoveUserFromOrganizationUnitDto }) { }
}

export class UserOrganizationUnitActionComplete implements Action {
  readonly type = UserOrganizationUnitActionTypes.UserOrganizationUnitActionComplete;
}

export class UserOrganizationUnitActionError implements Action {
  readonly type = UserOrganizationUnitActionTypes.UserOrganizationUnitActionError;
}

export class UsersAddedToOrganizationUnitDto implements Action {
  readonly type = UserOrganizationUnitActionTypes.UsersAddedToOrganizationUnitDto;
  constructor(public payload: { users: UserOrganizationUnitDto[], organizationUnitId: number }) { }
}

export class AddUsersToOrganizationUnit implements Action {
  readonly type = UserOrganizationUnitActionTypes.AddUsersToOrganizationUnit;
  constructor(public payload: { input: AddUsersToOrganizationUnitDto }) { }
}

export class CancelUserOrganizationUnitRequest implements Action {
  readonly type = UserOrganizationUnitActionTypes.CancelUserOrganizationUnitRequest;
}

export class UserOrganizationUnitClearStore implements Action {
  readonly type = UserOrganizationUnitActionTypes.UserOrganizationUnitClearStore;
}

export class LoadUserOrganizationUnits implements Action {
  readonly type = UserOrganizationUnitActionTypes.LoadUserOrganizationUnits;
  constructor(public payload: { filter: GetUserOrganizationUnitDto }) { }
}

export class UserOrganizationUnitsLoaded implements Action {
  readonly type = UserOrganizationUnitActionTypes.UserOrganizationUnitsLoaded;
  constructor(public payload: { userOrganizationUnits: UserOrganizationUnitDto[], total: number }) { }
}

export type UserOrganizationUnitActions = LoadUserOrganizationUnits;
