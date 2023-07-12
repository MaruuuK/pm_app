import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pm-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit{
  loginForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      },
    );
  }

  onSubmit() {
    console.log(this.loginForm);
  }
}
