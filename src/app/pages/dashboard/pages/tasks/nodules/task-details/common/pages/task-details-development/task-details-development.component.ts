import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-task-details-development',
  templateUrl: './task-details-development.component.html',
  styleUrl: './task-details-development.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsDevelopmentComponent {
  constructor() {}
}
