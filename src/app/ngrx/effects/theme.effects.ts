import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { LocalStorageService } from 'src/app/localstorage.service'
import { ActionTypes } from '../actions/theme.action'
import { map, mergeMap, of } from 'rxjs'
import { ThemeState } from '../reducers/theme.reducer'

@Injectable()
export class ThemeEffects {
  theme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.Dark || ActionTypes.Light),
      mergeMap(({ payload }) => {
        this.storageService.set('theme', payload)
        return of(this.storageService.get('theme'))
      }),
    )
  })

  constructor(
    private actions$: Actions,
    private storageService: LocalStorageService,
  ) {}
}
