import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LayoutComponent} from '../../shared/components/common/layout/layout.component';
import {RouterOutlet} from '@angular/router';
import {ButtonComponent} from '../../shared/components/ui/button/button.component';
import {GlowDirective} from '../../shared/directives/effects/glow-effect.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [
    LayoutComponent,
    RouterOutlet,
    ButtonComponent,
    GlowDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  constructor() {
  }
}
