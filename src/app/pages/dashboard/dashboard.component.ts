import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {HeaderComponent} from '../../shared/components/common/header/header.component';
import {InteractiveDotsDirective} from '../../shared/directives/effects/interactive-dots.directive';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DefaultComponentClass } from '../../shared/abstract-classes/default-component.class';
import { UserDetailComponent } from './common/user-detail/user-detail.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [HeaderComponent, InteractiveDotsDirective, RouterOutlet, UserDetailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends DefaultComponentClass implements OnInit {
  protected username: WritableSignal<string | null> = signal<string | null>(null);

  constructor(private _activatedRoute: ActivatedRoute) {
    super();
  }

  private _listenUsername(): void {
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      const username: string = params['username'];
      this.username.set(username);
    });
  }

  ngOnInit(): void {
    this._listenUsername();
  }
}
