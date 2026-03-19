import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrl: './user-followers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFollowersComponent {
  constructor() {}
}
