import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[glowEffect]',
  standalone: true,
})
export class GlowDirective implements AfterViewInit, OnDestroy {

  @Input() glowColor = 'rgba(237,237,237,0.15)';
  @Input() glowSize = 150;

  private overlay: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    const native = this.el.nativeElement;

    this.renderer.setStyle(native, 'position', 'relative');
    this.renderer.setStyle(native, 'overflow', 'hidden');

    this.overlay = this.renderer.createElement('div');
    const s = this.overlay!.style;
    Object.assign(s, {
      position: 'absolute',
      inset: '0',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 1.35s ease',
      zIndex: '0',
    });

    this.renderer.appendChild(native, this.overlay);
  }

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!this.overlay) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.overlay.style.background =
      `radial-gradient(${this.glowSize}px circle at ${x}px ${y}px, ${this.glowColor}, transparent 70%)`;
    this.overlay.style.opacity = '1';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    if (this.overlay) {
      this.overlay.style.opacity = '0';
    }
  }

  ngOnDestroy(): void {
    if (this.overlay) {
      this.renderer.removeChild(this.el.nativeElement, this.overlay);
      this.overlay = null;
    }
  }
}
