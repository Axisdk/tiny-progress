import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {inject} from '@angular/core';
import {AuthHelperService} from '../../modules/auth/services/auth-helper.service';
import {EnvService} from '../../modules/env/services/env.service';
import {TokensInterface} from '../../modules/auth/interfaces/tokens.interface';

const routesWithoutSendTokens: string[] = ['auth/login'];

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authHelperService: AuthHelperService = inject(AuthHelperService);
  const envService: EnvService = inject(EnvService);
  const apiUrl: string = envService.api;

  if (!req.url.includes(apiUrl) || routesWithoutSendTokens.some((route: string): boolean => req.url.includes(route))) {
    return next(req);
  }

  return from(authHelperService.getTokens()).pipe(
    switchMap((tokens: TokensInterface | null): Observable<HttpEvent<unknown>> => {
      if (!tokens) return next(req);
      return next(addTokenHeader(req, tokens.access_token));
    }),
  );
}


function addTokenHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
}
