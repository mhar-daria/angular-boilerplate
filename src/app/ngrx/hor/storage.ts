import { Action, ActionReducer, MetaReducer } from '@ngrx/store'
import { merge, pick } from 'lodash'
import { LocalStorageService } from 'src/app/localstorage.service'

export function storageMetaReducer<S, A extends Action = Action>(
  storeKey: string,
  reducerKeys: Array<string>,
  storageService: LocalStorageService,
) {
  let onInit = true
  return function (reducer: ActionReducer<S, A>) {
    return function (state: S, action: A) {
      const nextState = reducer(state, action)

      if (onInit) {
        onInit = false
        const savedState = JSON.parse(storageService.get(storeKey))
        console.log('oninit', merge(nextState, savedState))
        return merge(nextState, savedState)
      }
      console.log(nextState, reducerKeys)
      const stateToSave = pick(nextState, reducerKeys)
      storageService.set(storeKey, JSON.stringify(stateToSave))

      return nextState
    }
  }
}

export function getMetaReducers(
  storeKey: string,
  reducerKeys: Array<string>,
  service: LocalStorageService,
): Array<MetaReducer<any>> {
  return [storageMetaReducer(storeKey, reducerKeys, service)]
}
