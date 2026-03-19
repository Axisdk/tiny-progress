import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPostsComponent {
  constructor() {}
}
