import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { CrisisListComponent } from './crisis-list/crisis-list.component'
import { HeroListComponent } from './hero-list/hero-list.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HeroesModule } from './heroes/heroes.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialsModule } from 'src/app/modules/materials.module'
import { UsersModule } from './users/users.module'
import { LayoutComponent } from './layout/layout.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { MatIconModule } from '@angular/material/icon'
import { UserDetailsDialogComponent } from './shared/dialog/user-details-dialog/user-details-dialog.component'
import { DialogModule } from './modules/dialog.module'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { CommonModule, NgIf } from '@angular/common'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'
import { LoginComponent } from './pages/login/login.component'
import { LoginFormComponent } from './forms/login-form/login-form.component'
import { HttpClientInterceptor } from './interceptors/http-client.interceptor'
import { LoadingComponent } from './common/loading/loading.component'
import { AdminLayoutComponent } from './layout/admin/admin-layout.component'
import {
  META_REDUCERS,
  StoreModule,
  USER_PROVIDED_META_REDUCERS,
} from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment'
import * as Reducers from 'src/app/ngrx/reducers'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './ngrx/effects/auth.effects'
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_PERSISTENT_KEYS,
} from './injections/reducer.tokens'
import { getMetaReducers } from './ngrx/hor/storage'
import { LocalStorageService } from './localstorage.service'
// import { storageMetaReducer } from './ngrx/hor/storage'

@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    HeroListComponent,
    PageNotFoundComponent,
    LayoutComponent,
    LoginComponent,
    LoginFormComponent,
    LoadingComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    HeroesModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialsModule,
    UsersModule,
    AppRoutingModule,
    MatIconModule,
    DialogModule,
    StoreModule.forRoot({
      auth: Reducers.default.auth,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(AuthEffects),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: LOCAL_STORAGE_KEY,
      useValue: '__doodatees__',
    },
    {
      provide: LOCAL_STORAGE_PERSISTENT_KEYS,
      useValue: ['auth'],
    },
    {
      provide: USER_PROVIDED_META_REDUCERS,
      // useValue: [getMetaReducers]
      useFactory: getMetaReducers,
      deps: [
        LOCAL_STORAGE_KEY,
        LOCAL_STORAGE_PERSISTENT_KEYS,
        LocalStorageService,
      ],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3 * 1000,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
