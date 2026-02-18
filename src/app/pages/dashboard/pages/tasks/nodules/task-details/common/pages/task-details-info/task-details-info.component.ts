import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-task-details-info',
  templateUrl: './task-details-info.component.html',
  styleUrl: './task-details-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsInfoComponent {
  constructor() {}
}
