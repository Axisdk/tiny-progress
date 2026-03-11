import {Injectable} from '@angular/core';
import {LoginRequestInterface} from '../interfaces/login-request.interface';
import {delay, from, Observable, of, switchMap, tap, throwError} from 'rxjs';
import {LoginResponseInterface} from '../interfaces/login-response.interface';
import {AuthHelperService} from './auth-helper.service';
import {LogoutResponseInterface} from '../interfaces/logout-response.interface';
import {TokensInterface} from '../interfaces/tokens.interface';
import {HttpClient} from '@angular/common/http';
import {EnvService} from '../../env/services/env.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _envService: EnvService,
    private _authHelperService: AuthHelperService,
  ) {
  }

  public login$(data: LoginRequestInterface): Observable<LoginResponseInterface> {
    const url: string = `${this._envService.api}/auth/login`

    return this._http.post<LoginResponseInterface>(url, data).pipe(
      delay(1000),
      tap((response: LoginResponseInterface): void => {
        this._authHelperService.setTokens(response.tokens)
      })
    )
  }

  public logout$(): Observable<LogoutResponseInterface> {
    return of({success: true});
  }

  public refresh$(): Observable<TokensInterface> {
    const url: string = `${this._envService.api}/auth/refresh`;

    return from(this._authHelperService.getTokens()).pipe(
      switchMap((tokens: TokensInterface | null): Observable<TokensInterface> => {
        if (!tokens?.refresh_token) return throwError((): Error => new Error('No refresh token'));
        return this._http.post<TokensInterface>(url, {refresh_token: tokens.refresh_token});
      }),
      tap((tokens: TokensInterface): void => {
        this._authHelperService.setTokens(tokens);
      }),
    );
  }
}
