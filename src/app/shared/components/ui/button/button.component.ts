import {ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {SizesType} from '../../../../core/types/sizes.type';
import {AppearanceType} from '../../../../core/types/appearance.type';
import {ButtonTypeType} from './core/types/button-type.type';
import {LucideAngularModule} from 'lucide-angular';
import {IconComponent} from '../icon/icon.component';
import {IconAppearanceType} from '../icon/core/types/icon-appearance.type';
import {LoadingType} from '../loading/core/types/loading-type.type';
import {LoadingComponent} from '../loading/loading.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [
    LucideAngularModule,
    IconComponent,
    LoadingComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonComponent {

  public type: InputSignal<ButtonTypeType> = input<ButtonTypeType>('rectangle')
  public size: InputSignal<SizesType> = input<SizesType>('xl')
  public appearance: InputSignal<AppearanceType> = input<AppearanceType>('primary')
  public iconStart: InputSignal<string | null> = input<string | null>(null)
  public iconEnd: InputSignal<string | null> = input<string | null>(null)
  public isLoading: InputSignal<boolean> = input<boolean>(false)
  public loadingType: InputSignal<LoadingType> = input<LoadingType>('default')
  public isDisabled: InputSignal<boolean> = input<boolean>(false)

  public clicked: OutputEmitterRef<void> = output<void>()

  constructor() {}

  protected getIconAppearance(): IconAppearanceType {
    switch (this.appearance()) {
      case 'primary':
      case 'success':
      case 'danger':
      case 'info':
      case 'dark':
      case 'outline':
      case 'flat':
        return 'primary'
      case 'warning':
      case 'light':
        return 'dark'
    }
  }

  protected getLoadingAppearance(): AppearanceType {
    switch (this.appearance()) {
      case 'primary':
      case 'success':
      case 'danger':
      case 'info':
      case 'dark':
      case 'outline':
      case 'flat':
        return 'primary'
      case 'warning':
      case 'light':
        return 'dark'
    }
  }

  protected click(): void {
    if (this.isDisabled() || this.isLoading()) return

    this.clicked.emit()
  }
}
