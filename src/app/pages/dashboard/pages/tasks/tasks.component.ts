import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TasksFilterComponent} from './common/tasks-filter/tasks-filter.component';
import {TaskCardComponent} from './common/task-card/task-card.component';
import {PaginationComponent} from '../../../../shared/components/common/pagination/pagination.component';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.component.html',
  styleUrl: 'tasks.component.scss',
  imports: [
    TasksFilterComponent,
    TaskCardComponent,
    PaginationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  constructor() {}
}
