import { Component, OnInit, ViewChild } from '@angular/core'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Meta } from 'src/app/models/meta'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs'
import { User } from 'src/app/models/user'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator

  loadingUsers: boolean = false

  faEye = faEye

  // users$: User[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource([])

  columns: string[] = ['name', 'username', 'actions']

  meta: Meta = {
    total: 0,
    totalPages: 0,
    perPage: 5,
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void {
    this.loadingUsers = true
    this.usersService
      .getUsers()
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users)
        this.dataSource.paginator = this.paginator
        const newMeta = {
          ...this.meta,
          total: users.length,
          totalPages: Math.ceil(users.length / this.meta.perPage),
        }
        this.meta = newMeta
      })
      .add(() => (this.loadingUsers = false))
  }

  preview(user: User): void {
    console.log(user)
  }
}
