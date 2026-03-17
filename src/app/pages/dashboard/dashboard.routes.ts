import { Routes } from '@angular/router';
import { TasksListComponent } from './common/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TasksListComponent,
        pathMatch: 'full',
      },
      {
        path: ':slug',
        component: TaskDetailsComponent,
        loadChildren: () =>
          import('./pages/task-details/task-details.routes').then((m) => m.taskDetailsRoutes),
      },
    ],
  },
];
