import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static invalidName(control: FormControl): { [s: string]: boolean } | null {
    if (!/^[a-zа-я\s]*$/i.test(control.value)) {
      return { invalidName: true };
    }
    return null;
  }

  static matchPassword(control: AbstractControl): ValidationErrors | null {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }

  static containSpecialSymbols(
    control: AbstractControl
  ): ValidationErrors | null {
    const password: string = control.value;
    const specialSymbolsRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!specialSymbolsRegex.test(password)) {
      return { passwordWithoutSpecialSymbols: true };
    }

    return null;
  }
}
