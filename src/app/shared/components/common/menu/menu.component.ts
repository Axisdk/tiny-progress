import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IconComponent} from '../../ui/icon/icon.component';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrl: 'menu.component.scss',
  imports: [
    IconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  constructor() {}
}
