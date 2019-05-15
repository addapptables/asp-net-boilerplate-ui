import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginAction = '[Login] Login action'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
}

export type AuthActions = Login;
