import { NgModule } from '@angular/core'
import { UserDetailsDialogComponent } from '../shared/dialog/user-details-dialog/user-details-dialog.component'
import { MaterialsModule } from './materials.module'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { SpinnerComponent } from '../shared/spinner/spinner.component'
import { PopupMessageComponent } from '../shared/popup-message/popup-message.component'

@NgModule({
  imports: [CommonModule, MaterialsModule, BrowserModule],
  declarations: [
    SpinnerComponent,
    UserDetailsDialogComponent,
    PopupMessageComponent,
  ],
  exports: [UserDetailsDialogComponent],
})
export class DialogModule {}
