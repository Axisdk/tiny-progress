import {TaskStatusEnum} from '../enums/task-status.enum';
import {TechStackEnum} from '../enums/task-stacks.enum';
import {CollaboratorsInterface} from './collaborators.interface';
import {TaskPriorityEnum} from '../enums/task-priority.enum';
import {TaskDetailsCommentInterface} from './task-details-interfaces/task-details-comment.interface';
import {TaskDetailsAttachmentsInterfaces} from './task-details-interfaces/task-details-attachments.interfaces';
import {TaskDetailsHistoryInterface} from './task-details-interfaces/task-details-history.interface';
import {TaskDetailsAnalyticsInterface} from './task-details-interfaces/task-details-analytics.interface';
import {LanguageEnum} from '../../../core/enums/language.enum';

export interface TaskDetailsInfoInterface {
  readonly id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[]
  category: string
  language: LanguageEnum,
  progress: number;
  status: TaskStatusEnum;
  stacks: TechStackEnum[];
  collaborators: CollaboratorsInterface[];
  date_create: Date;
  date_last_seen: Date;

  // Дополнительно для детальной информации
  assignedTo: CollaboratorsInterface[]
  deadline: Date;
  priority: TaskPriorityEnum;
  comments: TaskDetailsCommentInterface[];
  attachments: TaskDetailsAttachmentsInterfaces[];
  history: TaskDetailsHistoryInterface[];

  analytics: TaskDetailsAnalyticsInterface
}
