import { Action } from '@ngrx/store'
import { User } from 'src/app/models/user'

export interface LoginPayload {
  username: string
  tkid: string
  password: string
}

export enum ActionTypes {
  FetchUser = '[User] Fetch',
  FetchUserSuccess = '[User] Success',
  FetchUserFailed = '[User] Failed',
}

export class FetchUser implements Action {
  readonly type = ActionTypes.FetchUser

  constructor(public payload: User | null) { }
}

export class FetchUserSuccess implements Action {
  readonly type = ActionTypes.FetchUserSuccess

  constructor(public payload: User | null) { console.log(payload, '[payload]') }
}

export class FetchUserFailed implements Action {
  readonly type = ActionTypes.FetchUserFailed
}

export type UserActionTypes = FetchUser | FetchUserSuccess | FetchUserFailed
