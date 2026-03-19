import {
  ChangeDetectionStrategy,
  Component,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../../../shared/components/ui/input/input.component';
import { TasksFiltersInterface } from '../../../../../../modules/task/interfaces/tasks-filters.interface';

@Component({
  selector: 'app-user-projects-filter',
  templateUrl: 'user-projects-filter.component.html',
  styleUrl: 'user-projects-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent],
})
export class UserProjectsFilterComponent {

  public onChangeFilters: OutputEmitterRef<TasksFiltersInterface | null> =
    output<TasksFiltersInterface | null>();

  protected filters: WritableSignal<TasksFiltersInterface | null> =
    signal<TasksFiltersInterface | null>(null);

  constructor() {}


}
