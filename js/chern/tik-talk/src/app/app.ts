import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from './common-ui/profile-card/profile-card';
import { ProfileService } from './data/services/profile.service';
import { JsonPipe } from '@angular/common';
import { Profile } from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard, JsonPipe], // подключение компонентов, которые будут использоваться в html
  templateUrl: './app.html', //подключение шаблона html
  styleUrl: './app.scss', //подключение стилей
})
export class App {
  protected title = 'tik-talk';
  profileService = inject(ProfileService);
  profiles = signal<Profile[]>([]); // Используем signals
  constructor() {
    this.profileService.getTestAccounts().subscribe({
      next: (data) => {
        this.profiles.set(data); // Signals автоматически обновляют UI
      },
    });
  }
}
