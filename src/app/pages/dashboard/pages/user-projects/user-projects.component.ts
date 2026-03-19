import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TasksFiltersInterface } from '../../../../modules/task/interfaces/tasks-filters.interface';
import { TasksHelperService } from '../../../../modules/task/services/tasks-helper.service';
import { UserProjectsListComponent } from './common/user-projects-list/user-projects-list.component';
import { UserProjectsFilterComponent } from './common/user-projects-filter/user-projects-filter.component';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { DefaultComponentClass } from '../../../../shared/abstract-classes/default-component.class';
import { TasksResponseInterface } from '../../../../modules/task/interfaces/tasks-response.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from '../../../../modules/task/services/tasks.service';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-projects.component.html',
  styleUrl: 'user-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserProjectsListComponent, UserProjectsFilterComponent],
})
export class UserProjectsComponent extends DefaultComponentClass implements OnInit {

  protected projectsResponse: WritableSignal<TasksResponseInterface | null> =
    signal<TasksResponseInterface | null>(null);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tasksService: TasksService,
    private _tasksHelperService: TasksHelperService,
  ) {
    super();
  }

  private _listenProjects(): void {
    this._tasksHelperService.tasksResponse$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: TasksResponseInterface | null): void => {
        this.projectsResponse.set(response);
      });

    this._tasksHelperService.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading: boolean): void => {
        this.isLoading.set(isLoading);
      });
  }

  private _getProjects(): void {
    const parentRoute: ActivatedRoute | null = this._activatedRoute.parent;
    if (!parentRoute) return

    parentRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: Params): Observable<TasksResponseInterface> => {
          const username: string = params['username'];
          return this._tasksService.getList$(username);
        }),
      )
      .subscribe();
  }

  protected changeFilters(filters: TasksFiltersInterface | null): void {
    if (!filters) return;
    this._tasksHelperService.setFilters(filters);
  }

  ngOnInit(): void {
    this._listenProjects();
    this._getProjects();
  }
}
