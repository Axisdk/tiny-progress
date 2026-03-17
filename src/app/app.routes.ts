import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProcessUserComponent} from './pages/specials/proess-user/process-user.component';
import {processUserGuard} from './shared/guards/process-user.guard';
import { NotFoundComponent } from './pages/specials/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'process-user',
    component: ProcessUserComponent,
    title: 'Вход',
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Страница не найдена',
  },
  {
    path: ':username',
    component: DashboardComponent,
    title: (route: ActivatedRouteSnapshot): string => `${route.params['username']}`,
    canActivate: [processUserGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  }
];
