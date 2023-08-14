import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<void>, next: HttpHandler) {
    this.authService.autoLogin();
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const token = user?.token;
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            Authorization: token ? 'Bearer ' + token: '',
          }),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
