import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { ConfigService } from 'src/app/shared/config.service';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  errMessageLoginExist = 'Login already exist';


  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private http: HttpClient,
    private translateService: TranslateService,
  ) {}

  getUserData() {
    return this.http.get<{ id: string; name: string; login: string }>(
      this.configService.apiUrl + '/users/' + this.authService.user.value?.id
    );
  }

  updateUserData(name: string, login: string, password: string) {
    return this.http
      .put<{ id: string; name: string; login: string }>(
        this.configService.apiUrl + '/users/' + this.authService.user.value?.id,
        {
          name: name,
          login: login,
          password: password,
        }
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteUser() {
    return this.http.delete<{ id: string; name: string; login: string }>(
      this.configService.apiUrl + '/users/' + this.authService.user.value?.id
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = this.translateService.instant('errorMessages.defaultError');
    if (
      errorRes.error.statusCode === 409 &&
      errorRes.error.message === this.errMessageLoginExist
    ) {
      errorMessage = this.translateService.instant(
        'errorMessages.loginExistError'
      );
    }
    if (!errorRes.error?.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }


}
