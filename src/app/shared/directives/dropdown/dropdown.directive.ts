import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Directive,
  effect,
  ElementRef,
  EnvironmentInjector,
  HostListener,
  inject,
  input,
  model,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import {DropdownComponent} from '../../components/ui/dropdown/dropdown.component';
import {DropdownPositionType} from '../../components/ui/dropdown/core/types/dropdown-position.type';

@Directive({
  selector: '[dropdown]',
  standalone: true,
})
export class DropdownDirective implements OnDestroy {
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly template = input.required<TemplateRef<unknown>>({alias: 'dropdown'});
  public readonly open = model<boolean>(false, {alias: 'dropdownOpen'});
  public readonly position = input<DropdownPositionType>('bottom-start', {alias: 'dropdownPosition'});

  private dropdownRef: ComponentRef<DropdownComponent> | null = null;
  private removeClickOutside: (() => void) | null = null;

  constructor() {
    effect(() => {
      if (this.open()) {
        this.createDropdown();
      } else {
        this.triggerClose();
      }
    });
  }

  @HostListener('click')
  protected onClick(): void {
    this.open.update(v => !v);
  }

  private createDropdown(): void {
    if (this.dropdownRef) {
      this.dropdownRef.instance.cancelClose();
      return;
    }

    const ref = createComponent(DropdownComponent, {
      environmentInjector: this.envInjector,
    });

    ref.setInput('template', this.template());
    ref.setInput('hostRect', this.el.nativeElement.getBoundingClientRect());
    ref.setInput('position', this.position());

    ref.instance.closed.subscribe(() => this.destroyDropdown());

    this.appRef.attachView(ref.hostView);
    document.body.appendChild(ref.location.nativeElement);
    ref.changeDetectorRef.detectChanges();

    this.dropdownRef = ref;

    setTimeout(() => {
      const handler = (event: MouseEvent): void => {
        const target = event.target as Node;
        if (
          !this.el.nativeElement.contains(target) &&
          !ref.location.nativeElement.contains(target)
        ) {
          this.open.set(false);
        }
      };
      document.addEventListener('click', handler);
      this.removeClickOutside = () => document.removeEventListener('click', handler);
    });
  }

  private triggerClose(): void {
    this.dropdownRef?.instance.close();
  }

  private destroyDropdown(): void {
    this.removeClickOutside?.();
    this.removeClickOutside = null;

    if (this.dropdownRef) {
      this.appRef.detachView(this.dropdownRef.hostView);
      this.dropdownRef.destroy();
      this.dropdownRef = null;
    }
  }

  public ngOnDestroy(): void {
    this.destroyDropdown();
  }
}
