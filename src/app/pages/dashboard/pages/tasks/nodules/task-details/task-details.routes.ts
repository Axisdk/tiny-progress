import {Routes} from '@angular/router';
import {TaskDetailsInfoComponent} from './common/pages/task-details-info/task-details-info.component';
import {TaskDetailsReleasesComponent} from './common/pages/task-details-releases/task-details-releases.component';
import {TaskDetailsMindComponent} from './common/pages/task-details-mind/task-details-mind.component';
import {TaskDetailsTodoComponent} from './common/pages/task-details-todo/task-details-todo.component';
import {
  TaskDetailsDevelopmentComponent
} from './common/pages/task-details-development/task-details-development.component';

export const taskDetailsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        component: TaskDetailsInfoComponent,
      },
      {
        path: 'mind',
        component: TaskDetailsMindComponent,
      },
      {
        path: 'releases',
        component: TaskDetailsReleasesComponent,
      },
      {
        path: 'todo',
        component: TaskDetailsTodoComponent,
      },
      {
        path: 'development',
        component: TaskDetailsDevelopmentComponent,
      }
    ]
  }
]
