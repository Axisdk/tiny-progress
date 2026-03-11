import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../../shared/components/common/header/header.component';
import {RouterOutlet} from '@angular/router';
import {InteractiveDotsDirective} from '../../shared/directives/effects/interactive-dots.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [HeaderComponent, RouterOutlet, InteractiveDotsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor() {
  }
}
