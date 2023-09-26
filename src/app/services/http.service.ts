import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  protected apiUrl = environment.apiUrl

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
}
