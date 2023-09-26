import * as _ from 'lodash'
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from 'src/app/models/user'
import { LoadingService } from 'src/app/services/loading.service'
import { UsersService } from 'src/app/services/users.service'
import { PopupMessageComponent } from '../../popup-message/popup-message.component'

export interface DialogData {
  user: User
  action: 'edit' | 'view' | 'create'
}

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css'],
})
export class UserDetailsDialogComponent {
  action: 'edit' | 'create' | 'view' = 'view'

  processing: boolean = false

  get user(): User | null {
    return this.data.user
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
  })

  @ViewChild('userForm') userForm: FormGroupDirective

  @Output() shouldUpdate = new EventEmitter<User>()
  @Output() shouldCreate = new EventEmitter<User>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public loadingService: LoadingService,
    public userService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action
  }

  ngOnInit() {
    if (this.action === 'edit') {
      this.form.setValue(this.getFormValue(this.data.user))
    }
  }

  private getFormValue(record): { [key: string]: any } {
    return {
      name: record.name,
      email: record.email,
      company: record.company.name,
      username: record.username,
    }
  }

  onSubmit(): void {
    this.loadingService.loading = true
    console.log(this.action)
    const payload = this.form.value

    if (this.action === 'edit') {
      this.userService.updateUser(this.user.id, payload).subscribe(
        (result) => {
          // success code here

          this.loadingService.loading = false
          this.action = 'view'
          const newUser = {
            ...this.data.user,
            ..._.omit(payload, ['company']),
            ...{
              company: {
                ...this.data.user.company,
                name: payload.company,
              },
            },
          }
          this.data.user = newUser
          this.shouldUpdate.emit(newUser)
          this.snackBar.openFromComponent(PopupMessageComponent, {
            data: {
              message: 'You updated a user account.',
            },
          })
        },
        (error) => {
          // something went wrong here
          this.loadingService.loading = false
          this.action = 'view'
          this.snackBar.openFromComponent(PopupMessageComponent, {
            data: {
              message: 'Unable to update.',
            },
          })
        }
      )
    }

    if (this.action === 'create') {
      this.userService.createUsers(payload).subscribe(
        (result) => {
          this.loadingService.loading = false

          const newUser = {
            ..._.omit(payload, ['company']),
            company: { name: payload.company },
          }
          this.data.user = newUser
          this.shouldCreate.emit(newUser)
          this.snackBar.openFromComponent(PopupMessageComponent, {
            data: {
              message: 'You have created a new user',
            },
          })
        },
        (error) => {
          this.loadingService.loading = false
          this.action = 'view'
          this.snackBar.openFromComponent(PopupMessageComponent, {
            data: {
              message: 'Something went wrong please try again.',
            },
          })
        }
      )
    }
  }

  private updateForm(): void {
    this.loadingService.loading = true

    const payload = this.form.value
  }
}
