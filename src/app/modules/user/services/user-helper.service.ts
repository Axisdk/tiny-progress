import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserHelperService {

  public user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);
  public isLoadingUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

}
