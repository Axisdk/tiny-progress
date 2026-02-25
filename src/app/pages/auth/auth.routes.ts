import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Авторизация'
      }
    ]
  }
]
