import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-task-details-mind',
  templateUrl: './task-details-mind.component.html',
  styleUrl: './task-details-mind.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsMindComponent {
  constructor() {}
}
