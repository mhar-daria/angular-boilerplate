import { createReducer, on, Action, ActionCreator } from '@ngrx/store'
import actions from 'src/app/ngrx/actions'
// import { ActionTypes } from '../actions/auth.actions'
import { ActionTypes, AuthActionTypes, Login } from "../actions/auth.actions";

export interface AuthState {
  isLogin: boolean
}

export const initialState: AuthState = {
  isLogin: false,
}

export function reducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case ActionTypes.Login: {
      return {
        isLogin: state.isLogin,
      }
    }
    case ActionTypes.Logout: {
      return {
        isLogin: false
      }
    }

  }
}
