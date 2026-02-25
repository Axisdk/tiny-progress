import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  InputSignal,
  signal,
  WritableSignal
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputTypeType} from './core/types/input-type.type';
import {SizesType} from '../../../../core/types/sizes.type';
import {ButtonComponent} from '../button/button.component';
import {IconComponent} from '../icon/icon.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    IconComponent
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }]
})
export class InputComponent implements ControlValueAccessor {

  public label: InputSignal<string | null> = input<string | null>(null)
  public type: InputSignal<InputTypeType> = input<InputTypeType>('text')
  public size: InputSignal<SizesType> = input<SizesType>('xl')
  public iconStart: InputSignal<string | null> = input<string | null>(null)

  protected value: WritableSignal<string> = signal<string>('');

  protected isVisiblePassword: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
  }

  private onChange: (value: string) => void = (): void => {
  };
  private onTouched: () => void = (): void => {
  };

  protected changeVisiblePassword(): void {
    this.isVisiblePassword.update((value: boolean): boolean => !value)
  }

  protected clearAll(): void {
    this.value.update((): string => '')
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // можно добавить логику, чтобы заблокировать input
  }

  // Наш хэндлер на input
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    this.value.set(target.value)
    this.onChange(this.value())
  }

  onBlur(): void {
    this.onTouched();
  }
}
