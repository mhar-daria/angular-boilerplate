import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  setErrors(form: FormGroup, errors: { [key: string]: Array<string> }): void {
    Object.keys(errors).map(errorKey => {
      const _errors: Array<string> = errors[errorKey]

      form.controls[errorKey].setErrors({ 'custom': _errors })
    })
  }
}
