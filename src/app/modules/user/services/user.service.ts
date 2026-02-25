import {Injectable} from '@angular/core';
import {LoginRequestInterface} from '../interfaces/login-request.interface';
import {delay, Observable, of, tap} from 'rxjs';
import {LoginResponseInterface} from '../interfaces/login-response.interface';
import {UserHelperService} from './user-helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _userHelperService: UserHelperService,
  ) {
  }

  public login(data: LoginRequestInterface): Observable<LoginResponseInterface> {
    console.log('login', data)

    return of({
      tokens: {
        access_token: 'sdasdasd',
        refresh_token: 'asdasd',
      },
      success: true,
      message: 'Login successful!'
    }).pipe(
      delay(2000),
      tap((response: LoginResponseInterface): void => {
        this._userHelperService.setTokens(response.tokens);
      })
    )
  }
}
