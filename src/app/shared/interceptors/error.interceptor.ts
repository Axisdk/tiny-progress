import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from '../../modules/auth/services/auth.service';
import {AuthHelperService} from '../../modules/auth/services/auth-helper.service';
import {TokensInterface} from '../../modules/auth/interfaces/tokens.interface';

const REFRESH_URL = '/auth/refresh';
const LOGIN_URL = '/auth/login';

export const errorsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const authHelper: AuthHelperService = inject(AuthHelperService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        return throwError(() => error);
      }

      // Рефреш сам вернул 401 — токены протухли, выходим
      if (req.url.includes(REFRESH_URL)) {
        authHelper.clearTokens();
        void router.navigate(['/auth/login']);
        return throwError(() => error);
      }

      // Логин вернул 401 — просто пробрасываем (неверный пароль и т.п.)
      if (req.url.includes(LOGIN_URL)) {
        return throwError(() => error);
      }

      // Любой другой 401 — обновляем токен и повторяем запрос
      return authService.refresh$().pipe(
        switchMap((tokens: TokensInterface) =>
          next(req.clone({setHeaders: {Authorization: `Bearer ${tokens.access_token}`}})),
        ),
        catchError(() => {
          authHelper.clearTokens();
          void router.navigate(['/auth/login']);
          return throwError(() => error);
        }),
      );
    }),
  );
};
