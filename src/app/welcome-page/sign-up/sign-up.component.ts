import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/custom-validators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isSignup = false;
  isLoading = false;
  error: string | null = null;

  signupForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          CustomValidators.invalidName,
        ]),
        login: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          CustomValidators.containSpecialSymbols,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: CustomValidators.matchPassword,
      }
    );
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(signupForm: FormGroup) {
    if (!signupForm.valid) {
      return;
    }
    const name = signupForm.value.name;
    const login = signupForm.value.login;
    const password = signupForm.value.password;

    this.isLoading = true;
    this.authService.signup(name, login, password).subscribe({
      next: () => {
        console.log();
        this.isLoading = false;
        this.isSignup = true;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
    this.signupForm.reset();
  }
}
