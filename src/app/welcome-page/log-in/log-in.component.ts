import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(loginForm: FormGroup) {
    if (!this.loginForm.valid) {
      return;
    }

    const login = loginForm.value.login;
    const password = loginForm.value.password;

    this.isLoading = true;

    this.authService.login(login, password).subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/main']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
  }
}
