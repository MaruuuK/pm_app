import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private http: HttpClient
  ) {}

  getUserData() {
    return this.http.get
      <{ id: string; name: string; login: string }>(
        this.configService.apiUrl + '/users/' + this.authService.user.value?.id);
  }

  updateUserData() {
  }
}
