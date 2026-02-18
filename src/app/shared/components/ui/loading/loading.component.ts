import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {LoadingType} from './core/types/loading-type.type';
import {SizesType} from '../../../../core/types/sizes.type';
import {AppearanceType} from '../../../../core/types/appearance.type';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoadingComponent {

  public type: InputSignal<LoadingType> = input<LoadingType>('default')
  public size: InputSignal<SizesType> = input<SizesType>('xl')
  public appearance: InputSignal<AppearanceType> = input<AppearanceType>('primary')

  constructor() {}

}
