import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { IconComponent } from '../../../../shared/components/ui/icon/icon.component';
import { UserInterface } from '../../../../modules/user/interfaces/user.interface';
import { UserService } from '../../../../modules/user/services/user.service';
import { UserHelperService } from '../../../../modules/user/services/user-helper.service';
import { AlertService } from '../../../../modules/alert/services/alert.service';
import { SkeletonDirective } from '../../../../shared/directives/skeleton/skeleton.directive';
import { UserRoutesConst } from './core/consts/user-routes.const';
import {
  UserDetailsRoutesSelectWithIconInterface
} from './core/interfaces/user-details-routes-select-with-icon.interface';
import { DefaultComponentClass } from '../../../../shared/abstract-classes/default-component.class';
import { UserDetailsRouterLinksEnum } from './core/enums/user-details-router-links.enum';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, IconComponent, SkeletonDirective],
})
export class UserDetailComponent extends DefaultComponentClass implements OnInit {
  protected readonly userDetailsRouterLinksEnum: typeof UserDetailsRouterLinksEnum =
    UserDetailsRouterLinksEnum;
  protected readonly userRoutesConst: UserDetailsRoutesSelectWithIconInterface[] = UserRoutesConst;

  public username: InputSignal<string | null> = input<string | null>(null);

  protected user: WritableSignal<UserInterface | null> = signal<UserInterface | null>(null);
  protected isLoadingUser: WritableSignal<boolean> = signal<boolean>(false);
  protected isLoadingFollow: WritableSignal<boolean> = signal<boolean>(false);

  protected activeRoute: WritableSignal<UserDetailsRouterLinksEnum> =
    signal<UserDetailsRouterLinksEnum>(this.userDetailsRouterLinksEnum.OVERVIEW);

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
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _userHelperService: UserHelperService,
    private _alertService: AlertService,
  ) {
    super();
    effect((): void => {
      const username: string | null = this.username();
      this._initUser(username);
    });
  }

  private _initRoute(): void {
    const child: ActivatedRoute | null = this._activatedRoute.firstChild;
    const path: string | undefined  = child?.snapshot.url[0]?.path;
    this.activeRoute.set(path ? path as UserDetailsRouterLinksEnum : this.userDetailsRouterLinksEnum.OVERVIEW);
  }

  private _getUser(username: string): void {
    this._userService
      .getUserById$(username)
      .pipe(
        takeUntil(this.destroy$),
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
        takeUntil(this.destroy$),
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

  protected setActiveRoute(route: UserDetailsRouterLinksEnum): void {
    this.activeRoute.set(route);
    this._router.navigate([route], {
      relativeTo: this._activatedRoute,
    });
  }

  ngOnInit(): void {
    this._initRoute();
  }
}
