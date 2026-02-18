import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-details-releases',
  templateUrl: './task-details-releases.component.html',
  styleUrl: './task-details-releases.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsReleasesComponent {
  constructor() {}
}
