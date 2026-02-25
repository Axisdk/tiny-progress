import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {InputComponent} from '../../../../shared/components/ui/input/input.component';
import {GlowDirective} from '../../../../shared/directives/effects/glow-effect.directive';
import {ButtonComponent} from '../../../../shared/components/ui/button/button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequestInterface} from '../../../../modules/user/interfaces/login-request.interface';
import {UserService} from '../../../../modules/user/services/user.service';
import {Subject, takeUntil, tap} from 'rxjs';
import {LoginResponseInterface} from '../../../../modules/user/interfaces/login-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    InputComponent,
    GlowDirective,
    ButtonComponent,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject();

  protected form: FormGroup | null = null

  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
  ) {
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  protected login(): void {
    const formValue: LoginRequestInterface | undefined = this.form?.value
    if (!formValue) return

    this._userService.login(formValue)
      .pipe(
        takeUntil(this._destroy$),
        tap({
          subscribe: (): void => this.isLoading.set(true),
          finalize: (): void => this.isLoading.set(false),
        })
      )
      .subscribe((response: LoginResponseInterface): void => {
        if (response.success) {
          this._router.navigate(['/dashboard']);
        }
      })
  }


  ngOnInit(): void {
    this._initForm()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
