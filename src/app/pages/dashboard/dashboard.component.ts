import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../../shared/components/common/header/header.component';
import {InteractiveDotsDirective} from '../../shared/directives/effects/interactive-dots.directive';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [HeaderComponent, InteractiveDotsDirective, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor() {}
}
