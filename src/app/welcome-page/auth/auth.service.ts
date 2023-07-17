import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupResponseData } from './auth-interfaces';
import { ConfigService } from 'src/app/shared/config.service';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  errMessageLoginExist = 'Login already exist';

  constructor(private http: HttpClient, private configService: ConfigService) {}

  signup(name: string, login: string, password: string) {
    return this.http
      .post<SignupResponseData>(this.configService.apiUrl + '/auth/signup', {
        name: name,
        login: login,
        password: password,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'Something went wrong. Please try later';
          if (
            errorRes.error.statusCode === 409 &&
            errorRes.error.message === this.errMessageLoginExist
          ) {
            errorMessage = 'This user already exist';
          }
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
          }
          return throwError(() => errorMessage);
        })
      );
  }
}
