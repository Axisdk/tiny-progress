import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserComponent} from './common/user/user.component';
import {GlowDirective} from '../../../directives/effects/glow-effect.directive';
import {ButtonComponent} from '../../ui/button/button.component';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  imports: [RouterLink, RouterLinkActive, UserComponent, GlowDirective, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor() {
  }
}
