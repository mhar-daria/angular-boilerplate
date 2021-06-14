import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { CrisisListComponent } from './crisis-list/crisis-list.component'
import { HeroListComponent } from './hero-list/hero-list.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HeroesModule } from './heroes/heroes.module'
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialsModule } from 'src/app/modules/materials.module'
import { UsersModule } from './users/users.module';
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  declarations: [AppComponent, CrisisListComponent, HeroListComponent, PageNotFoundComponent, LayoutComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    HeroesModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialsModule,
    UsersModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
