import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {DropdownPositionType} from './core/types/dropdown-position.type';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closing]': 'isClosing()',
    '[class.opens-top]': 'isOpensTop()',
    '[class.opens-bottom]': '!isOpensTop()',
    '[style]': 'hostStyles()',
    '(animationend)': 'onAnimationEnd()',
  },
})
export class DropdownComponent {
  public readonly template = input.required<TemplateRef<unknown>>();
  public readonly hostRect = input.required<DOMRect>();
  public readonly position = input<DropdownPositionType>('bottom-start');

  public readonly closed = output<void>();

  protected readonly isClosing = signal(false);
  protected readonly isOpensTop = computed(() => this.position().startsWith('top'));

  protected readonly hostStyles = computed<Record<string, string>>(() => {
    const rect = this.hostRect();
    const gap = 6;
    const pos = this.position();

    const styles: Record<string, string> = {
      'min-width': `${rect.width}px`,
    };

    if (pos.startsWith('bottom')) {
      styles['top'] = `${rect.bottom + gap}px`;
    } else {
      styles['bottom'] = `${window.innerHeight - rect.top + gap}px`;
    }

    if (pos.endsWith('start')) {
      styles['left'] = `${rect.left}px`;
    } else {
      styles['right'] = `${window.innerWidth - rect.right}px`;
    }

    return styles;
  });

  public close(): void {
    this.isClosing.set(true);
  }

  public cancelClose(): void {
    this.isClosing.set(false);
  }

  protected onAnimationEnd(): void {
    if (this.isClosing()) {
      this.closed.emit();
    }
  }
}
