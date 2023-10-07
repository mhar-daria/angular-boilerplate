import { Action, createAction } from '@ngrx/store'

interface LoginPayload {
  username: string
  tkid: string
  password: string
}

export enum ActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = ActionTypes.Login

  constructor(public isLogin: boolean) {
    console.log('auth.actions', isLogin)
  }
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout

  constructor() { }
}

export type AuthActionTypes = Login | Logout
