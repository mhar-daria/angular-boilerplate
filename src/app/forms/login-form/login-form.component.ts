import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { FormService } from 'src/app/services/form.service'
import { isEmpty } from 'lodash'
import { LoginOutputType } from 'src/app/types/auth'
import { LocalStorageService } from 'src/app/localstorage.service'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Login } from 'src/app/ngrx/actions/auth.action'
import { Observable } from 'rxjs'
import { selectData, selectLoading } from 'src/app/ngrx/reducers/auth.reducer'
import { get } from 'lodash'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Input() title: string = 'Login'

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private storageService: LocalStorageService,
    private router: Router,
    private store: Store,
  ) {
    if (
      this.storageService.check('token') &&
      !this.storageService.expired('token_expiration')
    ) {
      this.router.navigate(['/admin'])
    } else {
      this.storageService.remove('token')
      this.storageService.remove('token_expiration')
    }

    this.loading$ = this.store.pipe(select(selectLoading))
    this.data$ = this.store.pipe(select(selectData))
  }

  loading$: Observable<boolean>
  data$: Observable<LoginOutputType | null>

  get loading() {
    return this.authService.loading
  }

  set loading(status: boolean) {
    this.authService.loading = status
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  showPassword: boolean = false

  requestError: string = ''

  login(): void {
    if (this.form.invalid === true || this.loading === true) return

    // this.loading = true
    const { tkid, hashed } = this.authService.hash(
      this.form.get('password').value,
    )
    const payload = {
      ...this.form.value,
      tkid,
      password: hashed,
    }

    this.store.dispatch(new Login(payload))
  }

  private onSuccess(token: string, expiration: string): void {
    this.loading = false
    this.requestError = ''

    this.storageService.set('token', token)
    this.storageService.set('token_expiration', expiration)

    this.router.navigate(['/admin'])
  }

  errorHandler(error: HttpErrorResponse): void {
    const errorMessage: string = error.error?.message
    this.loading = false
    this.requestError = errorMessage
    if (error.status === 400) {
      const validationErrors: { [key: string]: Array<string> } =
        error.error?.errors || {}

      if (!isEmpty(validationErrors)) {
        this.formService.setErrors(this.form, validationErrors)
      }
    }
  }

  getErrors(form: FormGroup, key: string): any {
    return form.get(key).errors
  }
}
