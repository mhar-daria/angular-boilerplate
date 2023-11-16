import { Component, OnInit, OnDestroy } from '@angular/core'
import { LocalStorageService } from '../localstorage.service'
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  createUrlTreeFromSnapshot,
} from '@angular/router'
import { AuthService } from '../services/auth.service'
import { ThemeService } from '../services/theme.service'
import { Subscription } from 'rxjs'
import { ThemeMode } from '../types/theme'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = []
  theme: ThemeMode = 'light'
  constructor(
    private storageService: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {
    this.isLoggedIn = authService.isSignIn()
    if (!this.isLoggedIn) {
      authService.logout()
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.themeService.theme.subscribe((mode) => (this.theme = mode)),
    )
  }
  ngOnDestroy(): void {}

  isLoggedIn: boolean = false

  toggleTheme(): void {
    console.log('toggle', this.theme)
    this.themeService.setTheme(this.theme === 'dark' ? 'light' : 'dark')
  }
}
