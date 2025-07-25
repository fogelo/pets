import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  profileService = inject(ProfileService);
  ngOnInit() {
    console.log('hello from ngOnInit');
    this.profileService.getMe().subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }
}
