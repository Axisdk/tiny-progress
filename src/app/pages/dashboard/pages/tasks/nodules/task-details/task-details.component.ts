import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { taskRoutes } from './core/consts/task-routes.const';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskRoutesSelectWithIconInterface } from './core/interfaces/task-routes-select-with-icon.interface';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent {
  protected readonly taskRoutes: TaskRoutesSelectWithIconInterface[] = taskRoutes;

  public id: InputSignal<string | null> = input<string | null>('');

  protected activeRoute: WritableSignal<TaskRoutesSelectWithIconInterface> =
    signal<TaskRoutesSelectWithIconInterface>(this.taskRoutes[0]);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  protected changeRoute(route: TaskRoutesSelectWithIconInterface): void {
    this.activeRoute.set(route);
    this._router.navigate([route.value], { relativeTo: this._activatedRoute });
  }
}
