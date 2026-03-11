import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {UserHelperService} from '../../../../../../modules/user/services/user-helper.service';
import {UserInterface} from '../../../../../../modules/user/interfaces/user.interface';
import {Subject, takeUntil, tap} from 'rxjs';
import {Router} from '@angular/router';
import {LogoutResponseInterface} from '../../../../../../modules/user/interfaces/logout-response.interface';
import {AuthService} from '../../../../../../modules/auth/services/auth.service';
import {DropdownDirective} from '../../../../../directives/dropdown/dropdown.directive';
import {ButtonComponent} from '../../../../ui/button/button.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [
    DropdownDirective,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  protected user: WritableSignal<UserInterface | null> = signal<UserInterface | null>(null);
  protected isLoadingLogout: WritableSignal<boolean> = signal<boolean>(false);
  protected isOpenDropdown: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userHelperService: UserHelperService,
  ) {
  }

  private _listenUser(): void {
    this._userHelperService.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe((user: UserInterface | null): void => {
        this.user.set(user);
      })
  }

  protected logout(): void {
    this._authService.logout$()
      .pipe(
        takeUntil(this._destroy$),
        tap({
          subscribe: (): void => this.isLoadingLogout.set(true),
          finalize: (): void => this.isLoadingLogout.set(false),
        })
      )
      .subscribe((response: LogoutResponseInterface): void => {
        if (response.success) {
          this._router.navigate(['auth/login'])
        }
      })
  }

  ngOnInit(): void {
    this._listenUser()
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
