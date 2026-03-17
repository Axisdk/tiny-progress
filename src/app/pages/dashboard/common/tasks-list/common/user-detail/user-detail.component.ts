import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserInterface } from '../../../../../../modules/user/interfaces/user.interface';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { IconComponent } from '../../../../../../shared/components/ui/icon/icon.component';
import { UserService } from '../../../../../../modules/user/services/user.service';
import { UserHelperService } from '../../../../../../modules/user/services/user-helper.service';
import { AlertService } from '../../../../../../modules/alert/services/alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, IconComponent],
})
export class UserDetailComponent implements OnDestroy {
  public username: InputSignal<string | null> = input<string | null>(null);

  private _destroy$: Subject<void> = new Subject<void>();

  protected user: WritableSignal<UserInterface | null> = signal<UserInterface | null>(null);
  protected isLoadingUser: WritableSignal<boolean> = signal<boolean>(false);

  protected isLoadingFollow: WritableSignal<boolean> = signal<boolean>(false);

  protected isMe: Signal<boolean> = computed<boolean>((): boolean => {
    const currentUser: UserInterface | null = this.currentUser;
    const user: UserInterface | null = this.user();

    return currentUser?.user_name === user?.user_name;
  });

  protected isFollow: Signal<boolean> = computed<boolean>((): boolean => {
    const currentUser: UserInterface | null = this.currentUser;
    const user: UserInterface | null = this.user();
    if (!currentUser || !user) return false;

    return !!user?.followers?.find(
      (username: string): boolean => username === currentUser.user_name,
    );
  });

  get currentUser(): UserInterface | null {
    return this._userHelperService.user$.getValue();
  }

  constructor(
    private _userService: UserService,
    private _userHelperService: UserHelperService,
    private _alertService: AlertService,
  ) {
    effect((): void => {
      const username: string | null = this.username();
      this._initUser(username);
    });
  }

  private _getUser(username: string): void {
    this._userService
      .getUserById$(username)
      .pipe(
        takeUntil(this._destroy$),
        tap({
          subscribe: (): void => this.isLoadingUser.set(true),
          finalize: (): void => this.isLoadingUser.set(false),
        }),
      )
      .subscribe((user: UserInterface | null): void => {
        this.user.set(user);
      });
  }

  private _initUser(username: string | null): void {
    const currentUser: UserInterface | null = this.currentUser;
    if (!currentUser || !username) return;

    if (currentUser.user_name === username) {
      this.user.set(currentUser);
    } else {
      this._getUser(username);
    }
  }

  protected followUser(unfollow: boolean = false): void {
    const user: UserInterface | null = this.user();
    if (!user) return;

    this._userService
      .followUser$(user.user_name, unfollow)
      .pipe(
        takeUntil(this._destroy$),
        tap({
          subscribe: (): void => this.isLoadingFollow.set(true),
          finalize: (): void => this.isLoadingFollow.set(false),
        }),
      )
      .subscribe((user: UserInterface | null): void => {
        this.user.set(user);

        this._alertService.open({
          appearance: 'success',
          autoClose: 2000,
          title: 'Успех',
          message: unfollow ? 'Вы отписались от пользователя' : 'Вы подписались на пользователя',
        });
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
