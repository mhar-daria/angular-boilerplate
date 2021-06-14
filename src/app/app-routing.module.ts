import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CrisisListComponent } from './crisis-list/crisis-list.component'
import { HeroListComponent } from './hero-list/hero-list.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LayoutComponent } from 'src/app/layout/layout.component'
// import { UsersComponent } from './users/users.component'
// import { EditComponent } from './users/edit/edit.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'crisis-center',
        component: CrisisListComponent,
      },
      {
        path: 'heroes',
        component: HeroListComponent,
      },
      {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
