import {Injectable} from '@angular/core';
import {TasksHelperService} from './tasks-helper.service';
import {Observable, of, tap} from 'rxjs';
import {TasksResponseInterface} from '../interfaces/tasks-response.interface';
import {TASKS_RESPONSE_MOCK} from '../mocks/tasks-response.mock';
import {
  TaskRouterLinkEnum
} from '../../../pages/dashboard/pages/tasks/nodules/task-details/core/enums/task-router-link.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private _tasksHelperService: TasksHelperService,
  ) {
  }

  public getList$(): Observable<TasksResponseInterface> {
    return of(TASKS_RESPONSE_MOCK).pipe(
      tap({
        subscribe: (): void => {
          this._tasksHelperService.isLoading$.next(false);
        },
        next: (response: TasksResponseInterface): void => {
          this._tasksHelperService.tasks$.next(response);
        },
        finalize: (): void => {
          this._tasksHelperService.isLoading$.next(false);
        },
      }),
    );
  }

  public getTaskDetails$(id: string, type: TaskRouterLinkEnum): Observable<unknown> {
    return of({
      id,
      hello: 'world',
    });
  }
}
