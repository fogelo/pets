import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root', // Сервис будет синглтоном для всего приложения
})
export class ProfileService {
  http = inject(HttpClient); // Инжектируем HttpClient
  baseUrl = 'https://icherniakov.ru/yt-course/';
  constructor() {}
  getTestAccounts() {
    // Возвращает Observable - поток данных
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }
  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}account/me`);
  }
}
