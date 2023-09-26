import { Injectable } from '@angular/core';
import * as cryptoJs from 'crypto-js'
import { CommonService } from './common.service';
import { LoginInputType, LoginOutputType, hashedPasswordType } from '../types/auth';
import { Observable } from 'rxjs'
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptions } from '../types/http';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string

  constructor(private commonService: CommonService, private http: HttpClient, private storageService: LocalstorageService) {
    this.url = `${environment.apiBaseUrl}`
  }

  // private httpOptions: HttpOptions = {observe: 'response'}

  public hash(raw: string): hashedPasswordType {
    const tkid = this.commonService.random(32)
    const hashed = cryptoJs.AES.encrypt(raw, tkid).toString()

    return {
      tkid,
      hashed,
    }
  }

  public login(payload: LoginInputType): Observable<LoginOutputType> {
    return this.http.post<LoginOutputType>(`${this.url}/login`, payload)
  }

  private _loading: boolean = false

  get loading() {
    return this._loading
  }

  set loading(status: boolean) {
    this._loading = status
  }

  public logout(): void {
    this.storageService.remove('token')
    this.storageService.remove('token_expiration')
  }

  public isSignIn(): boolean {
    return this.storageService.check('token') && !this.storageService.expired('token_expiration')
  }
}
