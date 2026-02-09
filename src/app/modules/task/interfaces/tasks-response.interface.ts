import {TaskShortInterface} from './task-short.interface';

export interface TasksResponseInterface {
  count: number
  tasks: TaskShortInterface[]
  next: string
  prev: string
}
