import { Actions, Effects, createEffect, ofType } from '@ngrx/effects'
import { ActionTypes } from '../actions/auth.actions'

export class AuthEffects {

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType(ActionTypes.Login),
  //   exhasu
  // ))

  constructor(private actions$: Actions) { }
}