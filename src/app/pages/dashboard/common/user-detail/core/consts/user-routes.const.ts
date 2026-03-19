import { UserDetailsRoutesSelectWithIconInterface } from '../interfaces/user-details-routes-select-with-icon.interface';
import { UserDetailsRouterLinksEnum } from '../enums/user-details-router-links.enum';

export const UserRoutesConst: UserDetailsRoutesSelectWithIconInterface[] = [
  {
    title: 'Overview',
    value: UserDetailsRouterLinksEnum.OVERVIEW,
    icon: 'info',
  },
  {
    title: 'Projects',
    value: UserDetailsRouterLinksEnum.PROJECTS,
    icon: 'folder-kanban',
  },
  {
    title: 'Followers',
    value: UserDetailsRouterLinksEnum.FOLLOWERS,
    icon: 'users',
  },
  {
    title: 'Posts',
    value: UserDetailsRouterLinksEnum.POSTS,
    icon: 'sticky-note',
  },
];
