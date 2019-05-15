import { Action } from '@ngrx/store';
import { GetUserDto } from '../models/get-user-dto.model';
import { UserDto } from '../models/user-dto.model';
import { CreateUserDto } from '../models/create-user-dto.model';
import { UpdateUserDto } from '../models/update-user-dto.model';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  UsersLoaded = '[User] Users Loaded',
  CreateUser = '[User] Create User',
  UserCreated = '[User] User Created',
  UpdateUser = '[User] Update User',
  UserUpdated = '[User] User Updated',
  DeleteUser = '[User] Delete User',
  UserDeleted = '[User] User Deleted',
  CancelUserRequest = '[User] Cancel User Request',
  UserActionComplete = '[User] User Action Complete',
  UserActionError = '[User] User Action Error',
  UserClearStore = '[User] User Clear Store',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
  constructor(public payload: { params: GetUserDto }) { }
}

export class UsersLoaded implements Action {
  readonly type = UserActionTypes.UsersLoaded;
  constructor(public payload: { users: UserDto[], total: number }) { }
}

export class CreateUser implements Action {
  readonly type = UserActionTypes.CreateUser;
  constructor(public payload: { user: CreateUserDto }) { }
}

export class UserCreated implements Action {
  readonly type = UserActionTypes.UserCreated;
  constructor(public payload: { user: UserDto }) { }
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor(public payload: { user: UpdateUserDto }) { }
}

export class UserUpdated implements Action {
  readonly type = UserActionTypes.UserUpdated;
  constructor(public payload: { user: UserDto }) { }
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor(public payload: { id: number }) { }
}

export class UserDeleted implements Action {
  readonly type = UserActionTypes.UserDeleted;
  constructor(public payload: { id: number }) { }
}

export class CancelUserRequest implements Action {
  readonly type = UserActionTypes.CancelUserRequest;
}

export class UserActionComplete implements Action {
  readonly type = UserActionTypes.UserActionComplete;
}

export class UserActionError implements Action {
  readonly type = UserActionTypes.UserActionError;
}

export class UserClearStore implements Action {
  readonly type = UserActionTypes.UserClearStore;
}


export type UserActions = LoadUsers;
