import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localstorage.service';
import { ActivatedRouteSnapshot, Route, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private storageService: LocalStorageService, private router: Router, private authService: AuthService) {
    this.isLoggedIn = authService.isSignIn()
    if (!this.isLoggedIn) {
      authService.logout()
    }
  }

  ngOnInit(): void { }

  isLoggedIn: boolean = false
}
