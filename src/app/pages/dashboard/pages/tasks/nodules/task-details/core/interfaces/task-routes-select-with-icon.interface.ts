import {SelectInterface} from '../../../../../../../../core/interfaces/select.interface';
import {TaskRouterLinkEnum} from '../enums/task-router-link.enum';

export interface TaskRoutesSelectWithIconInterface extends SelectInterface<TaskRouterLinkEnum>{
  icon: string
}
