import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
@Component({
  selector: 'pm-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  constructor() {}

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

  onSubmit() {
    console.log(this.signupForm);
  }
}
