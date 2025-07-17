import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

/* 
- креды
	- ant_or
	- 9hUjP8bvJZ
*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course/';

  token: string | null = null;
  refreshToken: string | null = null;

  cookieService = inject(CookieService);
  router = inject(Router);

  // get - геттер, позволяет обращаться к методу как к свойству
  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  constructor() {}

  login(payload: { username: string; password: string }) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    const observable = this.http.post<TokenResponse>(
      `${this.baseUrl}auth/token`,
      formData
    );
    return observable.pipe(tap(this.saveTokens));
  }

  refreshAuthToken() {
    const observable = this.http
      .post<TokenResponse>(`${this.baseUrl}auth/token`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap(this.saveTokens),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
    return observable;
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(val: TokenResponse) {
    this.token = val.access_token;
    this.refreshToken = val.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
