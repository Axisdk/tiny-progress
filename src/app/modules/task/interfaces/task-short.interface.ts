import {TaskStatusEnum} from '../enums/task-status.enum';
import {TechStackEnum} from '../enums/task-stacks.enum';
import {CollaboratorsInterface} from './collaborators.interface';

export interface TaskShortInterface {
  id: string
  title: string
  description: string
  status: TaskStatusEnum
  stacks: TechStackEnum[]
  collaborators: CollaboratorsInterface[]
  date_create: Date,
  date_last_seen: Date
}
