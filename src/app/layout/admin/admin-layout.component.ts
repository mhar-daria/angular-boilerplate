import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/ngrx/actions/auth.actions';
import { AuthState } from 'src/app/ngrx/reducers/auth.reducer';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  auth$: Observable<boolean>

  constructor(private authService: AuthService, private router: Router, private store: Store<{ isLogin: boolean }>) {
    this.auth$ = store.pipe(select('isLogin'))
    this.auth$.subscribe(result => console.log('[store]', result))
  }

  dispatch() {
    this.store.dispatch(new Login(true))
  }
  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
