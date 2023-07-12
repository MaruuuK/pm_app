import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';

@Component({
  selector: 'pm-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  editProfileForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.editProfileForm = new FormGroup(
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
      },
    );
  }

  onSubmit() {
    console.log(this.editProfileForm);
  }
}
