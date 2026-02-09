import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeComponent } from '../../../../../../shared/components/ui/badge/badge.component';

@Component({
  selector: 'app-task-card',
  templateUrl: 'task-card.component.html',
  styleUrl: 'task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent]
})
export class TaskCardComponent {
  constructor() { }
}
