import { Injectable } from '@angular/core'
import { User } from 'src/app/models/user'
import { Observable, of } from 'rxjs'
import { HttpService } from './http.service'
import { tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class UsersService extends HttpService {
  private host: string = `https://jsonplaceholder.typicode.com`

  constructor(http: HttpClient) {
    super(http)
  }

  private usersUrl = `${this.apiUrl}/users`

  users: User[] = []

  getUsers(): Observable<User[]> {
    if (!_.isEmpty(this.users)) return of(this.users)

    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(tap((users: User[]) => (this.users = users)))
  }

  createUsers(payload: Partial<User>): Observable<User[]> {
    return this.http
      .post<User[]>(this.usersUrl, payload)
      .pipe(tap((_) => console.log('users created')))
  }

  updateUser(
    userId: string | number,
    payload: Partial<User>
  ): Observable<User> {
    return this.http.put<User>(`${this.host}/users/${userId}`, payload).pipe(
      tap((user) => {
        const users: User[] = this.users.map((_user) => {
          if (_user.id === userId) {
            return user
          }

          return _user
        }) as User[]

        this.users = users
      })
    )
  }
}
