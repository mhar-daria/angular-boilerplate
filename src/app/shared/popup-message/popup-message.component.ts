import { Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css'],
})
export class PopupMessageComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    @Inject(MatSnackBarRef) public snackBarRef
  ) {}
}
