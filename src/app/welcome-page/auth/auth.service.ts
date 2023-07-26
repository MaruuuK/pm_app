import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SignupResponseData, LoginResponseData } from './auth-interfaces';
import { ConfigService } from 'src/app/shared/config.service';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer!: any;
  private injector: Injector;

  errMessageLoginExist = 'Login already exist';
  errMessageLoginNotExist = 'Authorization error';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    injector: Injector
  ) {
    this.injector = injector;
  }

  private getTranslateService() {
    return this.injector.get(TranslateService);
  }

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
          const decodedToken: { exp: number; id: string } = jwt_decode(
            resData.token
          );
          const expirationDate = decodedToken
            ? new Date(decodedToken.exp * 1000)
            : null;
          const userId = decodedToken ? decodedToken.id : null;
          const user = new User(userId, login, resData.token, expirationDate);
          this.user.next(user);

          if (expirationDate) {
            const expirationDuration =
              expirationDate.getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
          }
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
    const userData: {
      id: string;
      login: string;
      _token: string;
      _tokenExpirationDate: string;
    } = userDataString ? JSON.parse(userDataString) : null;
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.login,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
    this.router.navigate(['/']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    const translateService = this.getTranslateService();
    let errorMessage = translateService.instant('errorMessages.defaultError');
    if (
      errorRes.error.statusCode === 409 &&
      errorRes.error.message === this.errMessageLoginExist
    ) {
      errorMessage = translateService.instant('errorMessages.loginExistError');
    }
    if (
      errorRes.error.statusCode === 401 &&
      errorRes.error.message === this.errMessageLoginNotExist
    ) {
      errorMessage = translateService.instant('errorMessages.loginNotExistError');
    }
    if (!errorRes.error?.error) {
      return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }
}
