import {Injectable} from '@angular/core';
import {AlertInterface} from '../interfaces/alert.interface';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  public alert$: Subject<AlertInterface> = new Subject<AlertInterface>();

  constructor() {
  }

  public open(alert: AlertInterface): void {
    this.alert$.next(alert);
  }
}
