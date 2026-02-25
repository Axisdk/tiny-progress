import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthComponent} from './pages/auth/auth.component';

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
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
];
