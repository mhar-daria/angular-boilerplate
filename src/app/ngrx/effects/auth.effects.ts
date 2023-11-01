import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  ActionTypes,
  LoginFailed,
  LoginPayload,
  LoginSuccess,
} from '../actions/auth.action'
import { exhaustMap, EMPTY, mergeMap, catchError, map } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { LoginOutputType } from 'src/app/types/auth'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.Login),
      mergeMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map((data: LoginOutputType) => {
            console.log(data, 'hey')
            return new LoginSuccess(data)
          }),
          catchError((err: HttpErrorResponse) => {
            console.log(err)
            new LoginFailed(err)

            return EMPTY
          }),
        ),
      ),
    )
  })

  constructor(private actions$: Actions, private authService: AuthService) {}
}
