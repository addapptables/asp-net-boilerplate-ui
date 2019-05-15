import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadUsers, UsersLoaded, CancelUserRequest, CreateUser,
  UserCreated, UserActionError, UpdateUser, UserUpdated, DeleteUser, UserDeleted
} from '../actions/user.actions';
import { switchMap, catchError, map, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserDto } from '../models/user-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';

@Injectable()
export class UserEffects {

  constructor(
    private _actions$: Actions,
    private _userService: UserService
  ) { }

  @Effect()
  $loadUsers = this._actions$.pipe(
    ofAction(LoadUsers),
    switchMap((action) =>
      this._userService.getAll(action.payload.params).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserRequest))),
        catchError(() => of(<PaginatedModel<UserDto>>{ items: [], totalCount: 0 }))
      )
    ),
    map((result) => new UsersLoaded({ users: result.items, total: result.totalCount }))
  );

  @Effect()
  $create = this._actions$.pipe(
    ofAction(CreateUser),
    switchMap((action) =>
      this._userService.create(action.payload.user).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserRequest))),
        map((user) => new UserCreated({ user })),
        catchError(() => of(new UserActionError()))
      )
    )
  );

  @Effect()
  $update = this._actions$.pipe(
    ofAction(UpdateUser),
    switchMap((action) =>
      this._userService.update(action.payload.user).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserRequest))),
        map((user) => new UserUpdated({ user })),
        catchError(() => of(new UserActionError()))
      )
    )
  );

  @Effect()
  $delete = this._actions$.pipe(
    ofAction(DeleteUser),
    switchMap((action) =>
      this._userService.deleteUser(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelUserRequest))),
        map(() => new UserDeleted({ id: action.payload.id })),
        catchError(() => of(new UserActionError()))
      )
    )
  );

}
