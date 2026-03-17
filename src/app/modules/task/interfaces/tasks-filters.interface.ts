import { TaskStatusEnum } from '../enums/task-status.enum';

export interface TasksFiltersInterface {
  title: string;
  status: TaskStatusEnum[]
}
