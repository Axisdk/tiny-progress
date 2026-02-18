import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
];
