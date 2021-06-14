import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UsersComponent } from './users.component'
import { EditComponent } from './edit/edit.component'
import { LayoutComponent } from 'src/app/layout/layout.component'

const routes: Routes = [
  {
    path: 'users',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id/edit',
        component: EditComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
