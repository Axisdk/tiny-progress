import {Injectable} from '@angular/core';
import {TasksHelperService} from './tasks-helper.service';
import { delay, Observable, of, tap} from 'rxjs';
import {TasksResponseInterface} from '../interfaces/tasks-response.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvService } from '../../env/services/env.service';
import { TasksRequestInterface } from '../interfaces/tasks-request.interface';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TaskRouterLinkEnum } from '../../../pages/dashboard/pages/task-details/core/enums/task-router-link.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private _http: HttpClient,
    private _envService: EnvService,
    private _tasksHelperService: TasksHelperService,
  ) {
  }

  public getList$(username: string): Observable<TasksResponseInterface> {
    const data: TasksRequestInterface = this._tasksHelperService.taskRequest$.getValue()

    const url: string = `${this._envService.api}/tasks/list`;

    let params = new HttpParams()
      .set('page', data.page)
      .set('page_size', data.page_size)
      .set('username', username);

    if (data.filters?.title) {
      params = params.set('filters[title]', data.filters.title);
    }
    if (data.filters?.status?.length) {
      data.filters.status.forEach(
        (status: TaskStatusEnum): HttpParams =>
          (params = params.append('filters[status][]', status)),
      );
    }

    return this._http.get<TasksResponseInterface>(url, { params }).pipe(
      delay(2000),
      tap({
        subscribe: (): void => {
          this._tasksHelperService.isLoading$.next(true);
        },
        next: (response: TasksResponseInterface): void => {
          this._tasksHelperService.tasksResponse$.next(response);
        },
        finalize: (): void => {
          this._tasksHelperService.isLoading$.next(false);
        },
      }),
    );
  }

  public getTaskDetails$(id: string, type: TaskRouterLinkEnum): Observable<unknown> {
    return of()
  }
}
