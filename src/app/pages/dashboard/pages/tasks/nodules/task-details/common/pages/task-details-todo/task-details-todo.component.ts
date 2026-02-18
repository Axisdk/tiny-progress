import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-task-details-todo',
  templateUrl: './task-details-todo.component.html',
  styleUrl: './task-details-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsTodoComponent {
  constructor() {}
}
