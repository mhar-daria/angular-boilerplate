import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ThemeMode } from './types/theme'
import { Observable, Subscription } from 'rxjs'
import { selectThemeMode } from './ngrx/reducers/theme.reducer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-router-app'

  constructor(private store: Store) {
    this.theme$ = this.store.pipe(select(selectThemeMode))
  }

  subscriptions: Array<Subscription> = []

  public mode: ThemeMode = 'light'

  ngOnInit(): void {
    this.subscriptions.push(this.theme$.subscribe((mode) => (this.mode = mode)))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

  theme$: Observable<ThemeMode>
}
