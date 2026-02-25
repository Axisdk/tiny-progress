import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokensInterface} from '../interfaces/tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class UserHelperService {
  protected readonly json: JSON = JSON

  public tokens$: BehaviorSubject<TokensInterface | null> = new BehaviorSubject<TokensInterface | null>(null);

  public user$: BehaviorSubject<any> = new BehaviorSubject<any>('asd');
  public isLoadingUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public setTokens(tokens: TokensInterface): void {
    this.tokens$.next(tokens)
    window.cookieStore.set('tokens', this.json.stringify(tokens));
  }

  public getTokens(): Promise<CookieListItem | null> {
    return window.cookieStore.get('tokens') ?? null;
  }
}
