import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../../shared/components/common/header/header.component';
import {MenuComponent} from '../../shared/components/common/menu/menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    HeaderComponent,
    MenuComponent,
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  constructor() {}
}
