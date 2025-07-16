import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";

@Component({
  selector: 'app-profile-card', // селектор компонента, который будет использоваться в html (по сути это тег)
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() profile!: Profile; //Для того, чтобы принимать пропсы (старый способ)
}
