import {Routes} from '@angular/router';
import {TasksComponent} from './pages/tasks/tasks.component';
import {TaskDetailsComponent} from './pages/tasks/nodules/task-details/task-details.component';

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
        loadChildren: () => import('./pages/tasks/tasks.routes').then(m => m.tasksRoutes),
      }
    ]
  },
]
