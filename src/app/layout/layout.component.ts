import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { ActivatedRouteSnapshot, Route, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private storageService: LocalstorageService, private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.storageService.check('token')
    console.log(this.isLoggedIn)
  }

  ngOnInit(): void {
  }

  isLoggedIn: boolean = false
}
