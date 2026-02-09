import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TaskShortInterface} from '../../../../../../modules/task/interfaces/task-short.interface';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task-card',
  templateUrl: 'task-card.component.html',
  styleUrl: 'task-card.component.scss',
  imports: [
    RouterLink,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {

  public task: InputSignal<TaskShortInterface | null> = input<TaskShortInterface | null>(null)

  constructor() {}
}
