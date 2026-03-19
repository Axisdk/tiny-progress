import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appSkeleton]',
  standalone: true,
})
export class SkeletonDirective implements OnChanges, OnDestroy {
  @Input() appSkeleton = false;

  private overlay: HTMLElement | null = null;
  private static keyframesInjected = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appSkeleton']) {
      this.appSkeleton ? this.apply() : this.remove();
    }
  }

  private apply(): void {
    this.injectKeyframes();

    const native = this.el.nativeElement;
    this.renderer.setStyle(native, 'position', 'relative');
    this.renderer.setStyle(native, 'overflow', 'hidden');

    this.overlay = this.renderer.createElement('div');
    Object.assign(this.overlay!.style, {
      position: 'absolute',
      inset: '0',
      borderRadius: 'inherit',
      backgroundColor: 'var(--background-primary-2)',
      backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
      zIndex: '9999',
      pointerEvents: 'none',
    });

    this.renderer.appendChild(native, this.overlay);
  }

  private remove(): void {
    if (this.overlay) {
      this.renderer.removeChild(this.el.nativeElement, this.overlay);
      this.overlay = null;
    }
  }

  private injectKeyframes(): void {
    if (SkeletonDirective.keyframesInjected) return;

    const styleEl: HTMLStyleElement = this.renderer.createElement('style');
    styleEl.textContent = `
      @keyframes skeleton-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    this.renderer.appendChild(this.document.head, styleEl);
    SkeletonDirective.keyframesInjected = true;
  }

  ngOnDestroy(): void {
    this.remove();
  }
}