import { createReducer, on, Action } from '@ngrx/store'
import actions from 'src/ngx/actions'
import * as AuthActions from "../actions/auth.actions";

export interface AuthState {
    token: string | null
    expiration: string | null
}

export const initialState: AuthState = {
    token: null,
    expiration: null
}

const authReducer = createReducer(
    initialState,
    on(actions.isSignedIn, (state) => state)
)

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action)
}
