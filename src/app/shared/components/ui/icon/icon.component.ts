import {
  ChangeDetectionStrategy,
  Component, computed,
  input,
  InputSignal, Signal,
} from '@angular/core';
import {IconAppearanceType} from './core/types/icon-appearance.type';
import {SizesType} from '../../../../core/types/sizes.type';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [
    LucideAngularModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class IconComponent {

  public icon: InputSignal<string> = input<string>('')
  public appearance: InputSignal<IconAppearanceType> = input<IconAppearanceType>('primary')
  public size: InputSignal<SizesType> = input<SizesType>('xl')

  protected iconAppearance: Signal<string> = computed<string>((): string => {
    switch (this.appearance()) {
      case "primary": return 'var(--status-light)'
      case "info": return 'var(--status-info)'
      case "success": return 'var(--status-success)'
      case "warning": return 'var(--status-warning)'
      case "danger": return 'var(--status-danger)'
      default: return 'var(--status-light)'
    }
  })

  protected iconSize: Signal<number> = computed<number>((): number => {
    switch (this.size()) {
      case "xl": return 24
      case "lg": return 20
      case "md": return 18
      case "sm": return 16
      default: return 24
    }
  })

  constructor() {}
}
