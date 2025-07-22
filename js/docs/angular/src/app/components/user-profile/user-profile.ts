import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: `user-profile.html`,
  styleUrl: `user-profile.scss`,
})
export class UserProfile {
  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());
  /* Your component code goes here */
  activateTrial() {
    this.isTrial.set(true);
  }
}
