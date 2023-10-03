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

    constructor(public payload: LoginPayload) {
        console.log('auth.actions', payload)
    }
}

export type AuthActionUnion = Login
// export const auth = createAction('[IsSignedIn] Signed In')
