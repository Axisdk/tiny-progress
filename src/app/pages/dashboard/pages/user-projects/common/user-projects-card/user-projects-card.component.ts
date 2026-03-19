import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import { BadgeComponent } from '../../../../../../shared/components/ui/badge/badge.component';
import { GlowDirective } from '../../../../../../shared/directives/effects/glow-effect.directive';
import { TaskShortInterface } from '../../../../../../modules/task/interfaces/task-short.interface';

@Component({
  selector: 'app-user-projects-card',
  templateUrl: 'user-projects-card.component.html',
  styleUrl: 'user-projects-card.component.scss',
  imports: [RouterLink, DatePipe, BadgeComponent, GlowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjectsCardComponent {
  public project: InputSignal<TaskShortInterface | null> = input<TaskShortInterface | null>(null);

  constructor() {
  }
}
