import { ActionTypes, ThemeActionTypes } from '../actions/theme.action'

export interface ThemeState {
  mode: 'dark' | 'light'
}

export const initialState: ThemeState = {
  mode: 'light',
}

export function reducer(
  state: ThemeState = initialState,
  action: ThemeActionTypes,
): ThemeState {
  console.log('actiontype', action.type)
  switch (action.type) {
    case ActionTypes.Dark: {
      return {
        mode: 'dark',
      }
    }
    case ActionTypes.Light: {
      return {
        mode: 'light',
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export const selectThemeMode = ({ theme }) => <'dark' | 'light'>theme.mode
