import { ActionReducer, Action } from "@ngrx/store";

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: Action) {
    return reducer(state, action)
  }
}
