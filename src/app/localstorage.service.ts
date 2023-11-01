import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  check(key: string): boolean {
    return !!this.get(key)
  }

  expired(key: string): boolean {
    return !moment(this.get(key)).isAfter(moment())
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value)
  }

  get(key: string): any {
    return localStorage.getItem(key)
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}
