import { TaskRouterLinkEnum } from '../enums/task-router-link.enum';
import { SelectInterface } from '../../../../../../core/interfaces/select.interface';

export interface TaskRoutesSelectWithIconInterface extends SelectInterface<TaskRouterLinkEnum> {
  icon: string;
}
