import {Injectable} from '@angular/core';
import {delay, Observable, tap} from 'rxjs';
import {UserHelperService} from './user-helper.service';
import {UserInterface} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {EnvService} from '../../env/services/env.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _envService: EnvService,
    private _userHelperService: UserHelperService,
  ) {
  }

  public getUser$(): Observable<UserInterface> {
    const url: string = `${this._envService.api}/users`

    return this._http.get<UserInterface>(url).pipe(
      delay(2000),
      tap((response: UserInterface): void => {
        this._userHelperService.user$.next(response);
      })
    )
  }
}
