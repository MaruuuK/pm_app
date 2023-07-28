import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { EditProfileService } from './editProfile.service';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pm-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit{
  alertMessage = '';
  isLoading = false;
  error = '';
  successMessage = '';

  editProfileForm!: FormGroup;

  constructor(
    private editProfileService: EditProfileService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService
  ) {}

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

  OnDeleteProfileNew() {
    this.editProfileService.deleteUser().subscribe(() => {
      this.confirmationService.hideConfirmModal();
      this.authService.logout();
    });
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

  onUpdateUser(editProfileForm: FormGroup) {
    this.isLoading = true;
    this.successMessage = '';
    this.error = '';
    if (!editProfileForm.valid) {
      return;
    }

    const name = editProfileForm.value.name;
    const login = editProfileForm.value.login;
    const password = editProfileForm.value.password;
    this.editProfileService.updateUserData(name, login, password).subscribe({
      next: () => {
        this.successMessage = this.translateService.instant(
          'editProfile.successMessage'
        );
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
  }

  onDeleteProfile() {
    this.confirmationService.showConfirmModal();
    this.alertMessage = this.translateService.instant(
      'confirmAlert.deleteUser'
    );
  }
  OnCancel() {
    this.confirmationService.hideConfirmModal();
  }
}
