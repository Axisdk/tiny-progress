import { TasksFiltersInterface } from './tasks-filters.interface';

export interface TasksRequestInterface {
  page: number;
  page_size: number;
  filters?: Partial<TasksFiltersInterface>;
}
