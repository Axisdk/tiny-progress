import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  output,
  OutputEmitterRef,
  Signal
} from '@angular/core';
import {AlertInterface} from '../../../../modules/alert/interfaces/alert.interface';
import {IconComponent} from '../icon/icon.component';
import {ButtonComponent} from '../button/button.component';
import {Subject, takeUntil, timer} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  imports: [
    IconComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  public alert: InputSignal<AlertInterface | null> = input<AlertInterface | null>(null);

  public close: OutputEmitterRef<void> = output<void>();

  protected icon: Signal<string> = computed<string>((): string => {
    const alert: AlertInterface | null = this.alert()

    switch (alert?.appearance) {
      case 'success':
        return 'circle-check'
      case 'warning':
      case 'error':
        return 'circle-alert'
      case 'info':
      default:
        return 'info'
    }
  })

  protected onClose(): void {
    this.close.emit()
  }

  constructor() {
  }

  private _startTimer(): void {
    const alert: AlertInterface | null = this.alert()
    if (!alert) return

    timer(alert.autoClose).pipe(takeUntil(this._destroy$)).subscribe((): void => this.onClose())
  }

  ngOnInit(): void {
    this._startTimer()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
