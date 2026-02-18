import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TasksResponseInterface } from '../interfaces/tasks-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksHelperService {
  public tasks$: BehaviorSubject<TasksResponseInterface | null> =
    new BehaviorSubject<TasksResponseInterface | null>(null);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}
}
