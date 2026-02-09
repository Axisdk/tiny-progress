import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {TasksFilterComponent} from './common/tasks-filter/tasks-filter.component';
import {TaskCardComponent} from './common/task-card/task-card.component';
import {PaginationComponent} from '../../../../shared/components/common/pagination/pagination.component';
import {TasksResponseInterface} from '../../../../modules/task/interfaces/tasks-response.interface';
import {TasksHelperService} from '../../../../modules/task/services/tasks-helper.service';
import {TasksService} from '../../../../modules/task/services/tasks.service';
import {Subject, takeUntil} from 'rxjs';

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
export class TasksComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  protected tasks: WritableSignal<TasksResponseInterface | null> = signal<TasksResponseInterface | null>(null);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private _tasksService: TasksService,
    private _tasksHelperService: TasksHelperService,
  ) {}

  private _listenTasks(): void {
    this._tasksHelperService.tasks$.pipe(takeUntil(this._destroy$)).subscribe((response: TasksResponseInterface | null): void => {
      this.tasks.set(response);
    })

    this._tasksHelperService.isLoading$.pipe(takeUntil(this._destroy$)).subscribe((isLoading: boolean): void => {
      this.isLoading.set(isLoading)
    })
  }

  private _getTasks(): void {
    this._tasksService.get$().pipe(takeUntil(this._destroy$)).subscribe()
  }

  ngOnInit(): void {
    this._listenTasks()
    this._getTasks()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
