import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AlertsComponent} from './shared/components/common/alerts/alerts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, AlertsComponent],
  styleUrl: './app.scss',
})
export class App {
  constructor() {
  }
}
