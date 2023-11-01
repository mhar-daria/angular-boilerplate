import { HttpErrorResponse } from '@angular/common/http'
import { Action } from '@ngrx/store'
import { LoginInputType, LoginOutputType } from 'src/app/types/auth'

export interface LoginPayload {
  username: string
  tkid: string
  password: string
}

export enum ActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] LoginSuccess',
  Logout = '[Auth] Logout',
  LoginFailed = '[Auth] LoginFailed',
}

export class Login implements Action {
  readonly type = ActionTypes.Login

  constructor(public payload: LoginInputType) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess

  constructor(public payload: LoginOutputType) {
    console.log(payload, '[payload]')
  }
}

export class LoginFailed implements Action {
  readonly type = ActionTypes.LoginFailed

  constructor(public payload: HttpErrorResponse) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout
}

export type AuthActionTypes = Login | Logout | LoginSuccess | LoginFailed
