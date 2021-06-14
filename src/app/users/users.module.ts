import { NgModule } from '@angular/core'
import { UsersRoutingModule } from './users-routing.module'
import { MaterialsModule } from 'src/app/modules/materials.module'
import { UsersComponent } from './users.component'
import { EditComponent } from './edit/edit.component'

@NgModule({
  declarations: [UsersComponent, EditComponent],
  imports: [MaterialsModule, UsersRoutingModule],
})
export class UsersModule {}
