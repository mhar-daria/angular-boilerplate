import { NgModule } from '@angular/core'
import { UsersRoutingModule } from './users-routing.module'
import { MaterialsModule } from 'src/app/modules/materials.module'
import { UsersComponent } from './users.component'
import { EditComponent } from './edit/edit.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [UsersComponent, EditComponent],
  imports: [CommonModule, MaterialsModule, UsersRoutingModule],
})
export class UsersModule {}
