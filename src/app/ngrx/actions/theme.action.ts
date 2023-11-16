import { Action } from '@ngrx/store'

export enum ActionTypes {
  Dark = '[Theme] Dark',
  Light = '[Theme] Light',
}

export class Dark implements Action {
  readonly type = ActionTypes.Dark
}

export class Light implements Action {
  readonly type = ActionTypes.Light
}

export type ThemeActionTypes = Dark | Light
