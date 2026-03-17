import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {UserHelperService} from '../../modules/user/services/user-helper.service';

export const processUserGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userHelper: UserHelperService = inject(UserHelperService);
  const router: Router = inject(Router);

  if (userHelper.user$.value !== null) return true;

  return router.createUrlTree(['/process-user'], { queryParams: { returnUrl: state.url } });
};
