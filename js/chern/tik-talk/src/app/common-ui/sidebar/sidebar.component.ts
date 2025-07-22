import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    SvgIconComponent,
    SubscriberCardComponent,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  
  // Signal подход
  me = this.profileService.me;
  
  // RxJS подход
  me2$ = this.profileService.me2$;
  menuItems = [
    { label: 'Моя страница', icon: 'home', link: '' },
    { label: 'Чаты', icon: 'chats', link: 'chats' },
    { label: 'Поиск', icon: 'search', link: 'search' },
  ];
  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
