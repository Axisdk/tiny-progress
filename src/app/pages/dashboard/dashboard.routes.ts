import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        component: TasksComponent,
        loadChildren: () => import('./pages/tasks/tasks.routes').then((m) => m.tasksRoutes),
      },
    ],
  },
];
