import {TokensInterface} from './tokens.interface';

export interface LoginResponseInterface {
  tokens: TokensInterface
  success: boolean
  message: string
}
