import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading: boolean = false

  constructor() {}

  get loading(): boolean {
    return this.isLoading
  }

  set loading(value: boolean) {
    this.isLoading = value
  }
}
