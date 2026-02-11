import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {TasksFilterComponent} from './common/tasks-filter/tasks-filter.component';
import {TaskCardComponent} from './common/task-card/task-card.component';
import {PaginationComponent} from '../../../../shared/components/common/pagination/pagination.component';
import {TasksResponseInterface} from '../../../../modules/task/interfaces/tasks-response.interface';
import {TasksHelperService} from '../../../../modules/task/services/tasks-helper.service';
import {TasksService} from '../../../../modules/task/services/tasks.service';
import {Subject, takeUntil} from 'rxjs';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.component.html',
  styleUrl: 'tasks.component.scss',
  imports: [
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {

  constructor(
  ) {}
}
