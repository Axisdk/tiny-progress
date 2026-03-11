import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {InputComponent} from '../../../../shared/components/ui/input/input.component';
import {GlowDirective} from '../../../../shared/directives/effects/glow-effect.directive';
import {ButtonComponent} from '../../../../shared/components/ui/button/button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequestInterface} from '../../../../modules/user/interfaces/login-request.interface';
import {Subject, takeUntil, tap} from 'rxjs';
import {AuthService} from '../../../../modules/auth/services/auth.service';
import {AlertService} from '../../../../modules/alert/services/alert.service';

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
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService,
  ) {
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      user_name: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  protected submit(): void {
    const formValue: LoginRequestInterface | undefined = this.form?.value
    if (!formValue) return

    this._authService.login$(formValue)
      .pipe(
        takeUntil(this._destroy$),
        tap({
          subscribe: (): void => this.isLoading.set(true),
          finalize: (): void => this.isLoading.set(false),
        })
      )
      .subscribe({
        next: (): void => {
          this._router.navigate(['/process-user']);
        },
        error: (): void => {
          this._alertService.open({
            appearance: 'error',
            title: 'Ошибка',
            message: 'Неверный логин или пароль',
            autoClose: 5000
          })
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
