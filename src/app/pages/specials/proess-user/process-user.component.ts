import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../modules/user/services/user.service';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingComponent} from '../../../shared/components/ui/loading/loading.component';
import {LayoutComponent} from '../../../shared/components/common/layout/layout.component';
import { UserInterface } from '../../../modules/user/interfaces/user.interface';

@Component({
  selector: 'app-proess-user',
  templateUrl: './process-user.component.html',
  styleUrl: './process-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LayoutComponent,
    LoadingComponent
  ]
})
export class ProcessUserComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) {
  }

  private _processUser(): void {
    const returnUrl: string = this._route.snapshot.queryParams['returnUrl'] || null;

    this._userService.getUser$().pipe(takeUntil(this._destroy$)).subscribe({
      next: (user: UserInterface): void => {
        this._router.navigateByUrl(returnUrl ?? `/${user.user_name}`);
      },
      error: (): void => {
        this._router.navigate(['/auth/login']);
      }
    })
  }

  ngOnInit(): void {
    this._processUser()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
