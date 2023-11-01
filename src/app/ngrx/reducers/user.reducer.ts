// import { ActionTypes, AuthActionTypes, Login } from "../actions/auth.actions";
import { LoginOutputType } from 'src/app/types/auth';
import * as moment from 'moment';
import { User } from "src/app/models/user";
import { ActionTypes, UserActionTypes } from "../actions/user.action";

export interface UserState {
  loading: boolean
  data: User | null
}

export const initialState: UserState = {
  loading: false,
  data: null
}

export function reducer(state: UserState = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case ActionTypes.FetchUser: {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case ActionTypes.FetchUserSuccess: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionTypes.FetchUserFailed: {
      return {
        loading: false,
        data: null
      }
    }

  }
}

export const selectLoading = ({ auth }) => <boolean>auth?.loading
// export const selectData = ({ auth }) => <LoginOutputType | null>console.log(auth);auth.data
export const selectData = ({ auth }) => { console.log(auth); return auth?.data }
// export const isLogin = ({ auth }) => <boolean>auth.data && moment(auth.data.expiration).isAfter(moment()) && auth.data.token
