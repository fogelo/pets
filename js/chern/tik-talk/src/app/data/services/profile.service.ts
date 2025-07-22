import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageable } from '../interfaces/pageable.interface';
import { map, tap, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Сервис будет синглтоном для всего приложения
})
export class ProfileService {
  http = inject(HttpClient); // Инжектируем HttpClient
  baseUrl = 'https://icherniakov.ru/yt-course/';
  
  // Signal подход (современный)
  me = signal<Profile | null>(null);
  
  // RxJS подход (до сигналов)
  private me2Subject = new BehaviorSubject<Profile | null>(null);
  me2$ = this.me2Subject.asObservable(); // Observable для подписки в компонентах
 
constructor() {}
  getTestAccounts() {
    // Возвращает Observable - поток данных
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }
  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}account/me`).pipe(
      tap((response) => {
        this.me.set(response); // Signal подход
        this.me2Subject.next(response); // RxJS подход
      })
    );
  }
  getSubscribersShortList() {
    return this.http
      .get<Pageable<Profile>>(
        `${this.baseUrl}account/subscribers/?page=1&size=50`
      )
      .pipe(
        map((response) => {
          return response.items;
        })
      );
  }
}
