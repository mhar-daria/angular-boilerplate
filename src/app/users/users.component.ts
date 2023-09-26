import * as _ from 'lodash'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Meta } from 'src/app/models/meta'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { User } from 'src/app/models/user'
import { UsersService } from 'src/app/services/users.service'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { UserDetailsDialogComponent } from '../shared/dialog/user-details-dialog/user-details-dialog.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  loadingUsers: boolean = false

  // users$: User[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource([])

  columns: string[] = ['name', 'username', 'email', 'actions']

  meta: Meta = {
    total: 0,
    totalPages: 0,
    perPage: 5,
  }

  ngOnInit(): void {
    this.getUsers()
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))
  }

  handleActionEvent(
    user: User | null,
    action: 'edit' | 'view' | 'create' = 'view'
  ): void {
    const dialogRef = this.dialog.open(UserDetailsDialogComponent, {
      panelClass: ['w-full', 'custom-dialog'],
      exitAnimationDuration: '1500ms',
      data: {
        user,
        action,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      user = {
        ...user,
        ..._.omit(result, ['company']),
        ...{ company: { name: result.company } },
      }
    })

    dialogRef.componentInstance.shouldUpdate.subscribe((result) => {
      const index = this.dataSource.data.findIndex(
        (user) => user.id === result.id
      )

      const newDataSource = this.dataSource.data
      newDataSource[index] = result

      this.dataSource.data = newDataSource
    })

    dialogRef.componentInstance.shouldCreate.subscribe((result) => {
      this.dataSource.data = [result, ...this.dataSource.data]
    })
  }

  getUsers(): void {
    this.loadingUsers = true
    this.usersService
      .getUsers()
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        const newMeta = {
          ...this.meta,
          total: users.length,
          totalPages: Math.ceil(users.length / this.meta.perPage),
        }
        this.meta = newMeta
      })
      .add(() => (this.loadingUsers = false))
  }
}
