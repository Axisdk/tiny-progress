import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProcessUserComponent} from './pages/specials/proess-user/process-user.component';
import {processUserGuard} from './shared/guards/process-user.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [processUserGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'process-user',
    component: ProcessUserComponent,
    title: 'Вход',
  },
];
