import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '../../../../../../shared/components/ui/button/button.component';
import {InputComponent} from '../../../../../../shared/components/ui/input/input.component';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: 'tasks-filter.component.html',
  styleUrl: 'tasks-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    InputComponent
  ]
})
export class TasksFilterComponent {
  constructor() {
  }
}
