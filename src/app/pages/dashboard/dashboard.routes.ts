import { Routes } from '@angular/router';
import { UserOverviewComponent } from './pages/user-overview/user-overview.component';
import { UserProjectsComponent } from './pages/user-projects/user-projects.component';
import { UserFollowersComponent } from './pages/user-followers/user-followers.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';

export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: UserOverviewComponent },
  { path: 'projects', component: UserProjectsComponent },
  { path: 'followers', component: UserFollowersComponent },
  { path: 'posts', component: UserPostsComponent },
];
