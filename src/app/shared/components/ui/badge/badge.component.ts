import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {SizesType} from '../../../../core/types/sizes.type';
import {AppearanceType} from '../../../../core/types/appearance.type';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BadgeComponent {

  public size: InputSignal<SizesType> = input<SizesType>('xl');
  public appearance: InputSignal<AppearanceType> = input<AppearanceType>('primary')

  constructor() {}
}
