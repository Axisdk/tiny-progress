import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {AlertService} from '../../../../modules/alert/services/alert.service';
import {Subject, takeUntil} from 'rxjs';
import {AlertInterface} from '../../../../modules/alert/interfaces/alert.interface';
import {AlertComponent} from '../../ui/alert/alert.component';
import {animate, group, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  imports: [
    AlertComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toast', [
      transition(':enter', [
        style({
          transform: 'translateX(calc(100% + 48px))',
          opacity: 0,
          height: '0',
          overflow: 'hidden'
        }),
        group([
          animate('350ms ease-out'),
          animate('500ms cubic-bezier(0.22, 1, 0.36, 1)', style({
            transform: 'translateX(0)',
            opacity: 1
          })),
        ]),
      ]),
      transition(':leave', [
        style({overflow: 'hidden'}),
        group([
          animate('300ms cubic-bezier(0.5, 0, 0.75, 0)', style({
            transform: 'translateX(calc(100% + 48px))',
            opacity: 0
          })),
          animate('350ms 50ms ease-in', style({
            height: '0'
          })),
        ]),
      ]),
    ]),
  ],
})
export class AlertsComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  protected alerts: WritableSignal<AlertInterface[]> = signal<AlertInterface[]>([])

  constructor(
    private _alertService: AlertService,
  ) {
  }

  protected removeAlert(index: number): void {
    this.alerts.set(this.alerts().filter((_: AlertInterface, i: number): boolean => i !== index))
  }

  private _listenAlerts(): void {
    this._alertService.alert$.pipe(takeUntil(this._destroy$)).subscribe((alert: AlertInterface): void => {
      this.alerts.set([alert, ...this.alerts()])
    })
  }

  ngOnInit(): void {
    this._listenAlerts()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
