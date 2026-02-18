import { TaskRouterLinkEnum } from '../enums/task-router-link.enum';
import { TaskRoutesSelectWithIconInterface } from '../interfaces/task-routes-select-with-icon.interface';

export const taskRoutes: TaskRoutesSelectWithIconInterface[] = [
  {
    title: 'Информация',
    value: TaskRouterLinkEnum.INFO,
    icon: 'info',
  },
  {
    title: 'Мысли',
    value: TaskRouterLinkEnum.MIND,
    icon: 'brain',
  },
  {
    title: 'Доска задач',
    value: TaskRouterLinkEnum.TODO,
    icon: 'list-todo',
  },
  {
    title: 'Релизы',
    value: TaskRouterLinkEnum.RELEASES,
    icon: 'rocket',
  },
  {
    title: 'Среда разработки',
    value: TaskRouterLinkEnum.DEVELOPMENT,
    icon: 'folder-code',
  },
];
