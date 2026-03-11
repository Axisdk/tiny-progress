import {Injectable} from '@angular/core';
import {TokensInterface} from '../interfaces/tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthHelperService {
  protected readonly json: JSON = JSON
  protected readonly tokensCookieKey: "tokens" = 'tokens';

  constructor() {
  }

  public setTokens(tokens: TokensInterface): void {
    cookieStore.set(this.tokensCookieKey, this.json.stringify(tokens));
  }

  public isAutorized(): Promise<boolean> {
    return this.getTokens().then((tokens: TokensInterface | null): boolean => !!tokens)
  }

  public getTokens(): Promise<TokensInterface | null> {
    return cookieStore.get(this.tokensCookieKey).then((tokens: CookieListItem | null): TokensInterface | null => {
      return this.json.parse(tokens?.value ?? 'null')
    }) ?? null;
  }

  public clearTokens(): void {
    cookieStore.delete(this.tokensCookieKey);
  }
}
