import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {UserProjectsCardComponent} from '../user-projects-card/user-projects-card.component';
import { TaskShortInterface } from '../../../../../../modules/task/interfaces/task-short.interface';
import { SkeletonDirective } from '../../../../../../shared/directives/skeleton/skeleton.directive';

@Component({
  selector: 'app-user-projects-list',
  templateUrl: './user-projects-list.component.html',
  styleUrl: './user-projects-list.component.scss',
  imports: [UserProjectsCardComponent, SkeletonDirective, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjectsListComponent {
  public projects: InputSignal<TaskShortInterface[]> = input<TaskShortInterface[]>([]);
  public isLoading: InputSignal<boolean> = input<boolean>(false);

  constructor() {}
}
