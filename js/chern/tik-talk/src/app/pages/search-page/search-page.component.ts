import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService); // Используем inject для получения сервиса
  profiles = signal<Profile[]>([]); // Используем signals для хранения данных
  constructor() {
    this.profileService.getTestAccounts().subscribe({
      next: (data) => {
        this.profiles.set(data); // Signals автоматически обновляют UI при изменении данных
      },
    });
  }
}
