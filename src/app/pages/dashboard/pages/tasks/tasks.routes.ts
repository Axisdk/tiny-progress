import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './nodules/task-details/task-details.component';
import { TasksListComponent } from './common/tasks-list/tasks-list.component';

export const tasksRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: TasksListComponent,
      },
      {
        path: ':slug',
        component: TaskDetailsComponent,
        loadChildren: () =>
          import('./nodules/task-details/task-details.routes').then((m) => m.taskDetailsRoutes),
      },
    ],
  },
];
