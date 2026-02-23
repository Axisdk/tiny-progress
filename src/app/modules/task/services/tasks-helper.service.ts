import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TasksResponseInterface} from '../interfaces/tasks-response.interface';
import {
  TaskRouterLinkEnum
} from '../../../pages/dashboard/pages/tasks/nodules/task-details/core/enums/task-router-link.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksHelperService {
  protected readonly object: ObjectConstructor = Object
  protected readonly taskRouterLinkEnum: typeof TaskRouterLinkEnum = TaskRouterLinkEnum

  public tasks$: BehaviorSubject<TasksResponseInterface | null> =
    new BehaviorSubject<TasksResponseInterface | null>(null);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public taskDetails$: Map<TaskRouterLinkEnum, BehaviorSubject<unknown>> = new Map<TaskRouterLinkEnum, BehaviorSubject<unknown>>([
    [this.taskRouterLinkEnum.INFO, new BehaviorSubject<unknown>(null)],
    [this.taskRouterLinkEnum.MIND, new BehaviorSubject<unknown>(null)],
    [this.taskRouterLinkEnum.TODO, new BehaviorSubject<unknown>(null)],
    [this.taskRouterLinkEnum.RELEASES, new BehaviorSubject<unknown>(null)],
    [this.taskRouterLinkEnum.DEVELOPMENT, new BehaviorSubject<unknown>(null)],
    [this.taskRouterLinkEnum.CHATS, new BehaviorSubject<unknown>(null)],
  ])

  private isLoadingTaskDetails$: Map<TaskRouterLinkEnum, BehaviorSubject<boolean>> = new Map<TaskRouterLinkEnum, BehaviorSubject<boolean>>([
    [this.taskRouterLinkEnum.INFO, new BehaviorSubject<boolean>(false)],
    [this.taskRouterLinkEnum.MIND, new BehaviorSubject<boolean>(false)],
    [this.taskRouterLinkEnum.TODO, new BehaviorSubject<boolean>(false)],
    [this.taskRouterLinkEnum.RELEASES, new BehaviorSubject<boolean>(false)],
    [this.taskRouterLinkEnum.DEVELOPMENT, new BehaviorSubject<boolean>(false)],
    [this.taskRouterLinkEnum.CHATS, new BehaviorSubject<boolean>(false)],
  ])


  constructor() {
  }

  public getTaskDetailsType(type: TaskRouterLinkEnum): BehaviorSubject<unknown> | undefined {
    return this.taskDetails$.get(type);
  }

  public getIsLoadingTaskDetailsType(type: TaskRouterLinkEnum): BehaviorSubject<boolean> | undefined {
    return this.isLoadingTaskDetails$.get(type);
  }

  public dropTaskCache(): void {
    for (const i of this.object.values(TaskRouterLinkEnum)) {
      const taskDetail$: BehaviorSubject<unknown> | undefined = this.getTaskDetailsType(i)
      const isLoadingTaskDetail$: BehaviorSubject<boolean> | undefined = this.getIsLoadingTaskDetailsType(i)
      if (!taskDetail$ || !isLoadingTaskDetail$) return

      taskDetail$.next(null)
      isLoadingTaskDetail$.next(false)
    }
  }
}
