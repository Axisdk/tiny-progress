import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProcessUserComponent} from './pages/specials/proess-user/process-user.component';
import {processUserGuard} from './shared/guards/process-user.guard';
import { NotFoundComponent } from './pages/specials/not-found/not-found.component';
import { dashboardRoutes } from './pages/dashboard/dashboard.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'process-user', component: ProcessUserComponent },
  { path: '404', component: NotFoundComponent },
  { path: ':username', component: DashboardComponent, canActivate: [processUserGuard], children: dashboardRoutes },
];
