import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { EditProfileService } from './editProfile.service';

@Component({
  selector: 'pm-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  isLoading = false;
  editProfileForm!: FormGroup;
  constructor(private editProfileService: EditProfileService) {}

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
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
    });

    this.getUserData();
  }

  private getUserData() {
    this.isLoading = true;
    this.editProfileService.getUserData().subscribe((userData) => {
      this.editProfileForm.patchValue({
        name: userData.name,
        login: userData.login,
      });
      this.isLoading = false;
    });
  }

  onSubmit() {}
  onDeleteProfile() {}
}
