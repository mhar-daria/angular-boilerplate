import { Injectable } from '@angular/core'
import { User } from 'src/app/models/user'
import { Observable } from 'rxjs'
import { HttpService } from './http.service'
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class UsersService extends HttpService {
  constructor(http: HttpClient) {
    super(http)
  }

  private usersUrl = `${this.apiUrl}/users`

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(tap(_ => console.log('fetched heroes')))
  }
}
