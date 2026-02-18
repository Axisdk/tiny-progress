import { Injectable } from '@angular/core';
import { TasksHelperService } from './tasks-helper.service';
import { delay, Observable, of, tap } from 'rxjs';
import { TasksResponseInterface } from '../interfaces/tasks-response.interface';
import { HttpClient } from '@angular/common/http';
import { TASKS_RESPONSE_MOCK } from '../mocks/tasks-response.mock';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private _http: HttpClient,
    private _tasksHelperService: TasksHelperService,
  ) {}

  public get$(): Observable<TasksResponseInterface> {
    return of(TASKS_RESPONSE_MOCK).pipe(
      delay(2000),
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
}
