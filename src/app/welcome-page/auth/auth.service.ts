import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupResponseData, LoginResponseData } from './auth-interfaces';
import { ConfigService } from 'src/app/shared/config.service';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();
  errMessageLoginExist = 'Login already exist';
  errMessageLoginNotExist = 'Authorization error';

  constructor(private http: HttpClient, private configService: ConfigService) {}

  signup(name: string, login: string, password: string) {
    return this.http
      .post<SignupResponseData>(this.configService.apiUrl + '/auth/signup', {
        name: name,
        login: login,
        password: password,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  login(login: string, password: string) {
    return this.http
      .post<LoginResponseData>(this.configService.apiUrl + '/auth/signin', {
        login: login,
        password: password,
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap((resData) => {
          const user = new User(resData.token);
          this.user.next(user);
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Something went wrong. Please try later';
    if (
      errorRes.error.statusCode === 409 &&
      errorRes.error.message === this.errMessageLoginExist
    ) {
      errorMessage = 'This user already exist';
    }
    if (
      errorRes.error.statusCode === 401 &&
      errorRes.error.message === this.errMessageLoginNotExist
    ) {
      errorMessage = 'Login or password are not correct';
    }
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }
}
