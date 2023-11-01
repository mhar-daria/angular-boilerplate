import { ActionTypes, AuthActionTypes } from '../actions/auth.action'
import { LoginOutputType } from 'src/app/types/auth'
import * as moment from 'moment'

export interface AuthState {
  loading: boolean
  error: string
  data: LoginOutputType | null
}

export const initialState: AuthState = {
  loading: false,
  error: '',
  data: null,
}

export function reducer(
  state: AuthState = initialState,
  action: AuthActionTypes,
): AuthState {
  switch (action.type) {
    case ActionTypes.LoginSuccess: {
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    }
    case ActionTypes.Login: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionTypes.Logout: {
      return {
        ...state,
        loading: false,
        data: null,
      }
    }
    case ActionTypes.LoginFailed: {
      return {
        ...state,
        data: null,
        loading: false,
      }
    }
    default: {
      return {
        ...state,
        loading: false,
      }
    }
  }
}

export const selectLoading = ({ auth }) => <boolean>auth?.loading
// export const selectData = ({ auth }) => <LoginOutputType | null>console.log(auth);auth.data
export const selectData = ({ auth }) => {
  console.log(auth)
  return auth?.data
}
export const isLogin = ({ auth }) =>
  <boolean>auth.data &&
  moment(auth.data.expiration).isAfter(moment()) &&
  auth.data.token
