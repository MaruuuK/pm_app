import { Component, OnInit } from '@angular/core';
import { AuthService } from './welcome-page/auth/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
