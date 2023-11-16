import { Injectable } from '@angular/core'
import { ThemeMode } from '../types/theme'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { selectThemeMode } from '../ngrx/reducers/theme.reducer'
import { Dark, Light } from '../ngrx/actions/theme.action'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private store: Store) {
    this.theme$ = this.store.pipe(select(selectThemeMode))
  }

  private theme$: Observable<ThemeMode>

  public get theme() {
    return this.theme$
  }

  public setTheme(mode: ThemeMode): void {
    if (mode === 'dark') {
      new Light()
    }
    if (mode === 'light') {
      new Dark()
    }
  }
}
