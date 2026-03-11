import {AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone, OnDestroy, Renderer2,} from '@angular/core';

interface Dot {
  x: number;
  y: number;
}

@Directive({
  selector: '[interactiveDots]',
  standalone: true,
})
export class InteractiveDotsDirective implements AfterViewInit, OnDestroy {

  @Input() dotsSpacing = 28;
  @Input() dotsRadius = 1;
  @Input() dotsInfluenceRadius = 100;
  @Input() dotsBaseColor = '100, 100, 100';
  @Input() dotsActiveColor = '255, 255, 255';

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private dots: Dot[] = [];
  private mouseX = -9999;
  private mouseY = -9999;
  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone,
  ) {
  }

  private _onResize(): void {
    const native: HTMLElement = this.el.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    const w = native.offsetWidth;
    const h = native.offsetHeight;

    if (!this.canvas) return;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.ctx?.scale(dpr, dpr);

    this._buildGrid(w, h);
  }

  private _buildGrid(w: number, h: number): void {
    this.dots = [];
    const spacing = this.dotsSpacing;
    const offsetX = ((w % spacing) / 2) + spacing / 2;
    const offsetY = ((h % spacing) / 2) + spacing / 2;

    for (let x = offsetX; x < w; x += spacing) {
      for (let y = offsetY; y < h; y += spacing) {
        this.dots.push({x, y});
      }
    }
  }

  private _startLoop(): void {
    const draw = () => {
      this._render();
      this.rafId = requestAnimationFrame(draw);
    };
    this.rafId = requestAnimationFrame(draw);
  }

  private _render(): void {
    const ctx = this.ctx;
    const canvas = this.canvas;
    if (!ctx || !canvas) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    const influence = this.dotsInfluenceRadius;
    const r = this.dotsRadius;

    for (const dot of this.dots) {
      const dx = dot.x - this.mouseX;
      const dy = dot.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const t = dist < influence ? 1 - dist / influence : 0;
      const opacity = 0.25 + t * 0.75;

      const base = this.dotsBaseColor;
      const active = this.dotsActiveColor;

      const [br, bg, bb] = base.split(',').map(v => parseInt(v.trim(), 10));
      const [ar, ag, ab] = active.split(',').map(v => parseInt(v.trim(), 10));

      const red = Math.round(br + (ar - br) * t);
      const green = Math.round(bg + (ag - bg) * t);
      const blue = Math.round(bb + (ab - bb) * t);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      ctx.fill();
    }
  }

  ngAfterViewInit(): void {
    const native: HTMLElement = this.el.nativeElement;

    this.renderer.setStyle(native, 'position', 'relative');
    this.renderer.setStyle(native, 'overflow', 'hidden');

    this.canvas = this.renderer.createElement('canvas') as HTMLCanvasElement;
    Object.assign(this.canvas.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      zIndex: '0',
    });

    this.renderer.appendChild(native, this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resizeObserver = new ResizeObserver(() => this._onResize());
    this.resizeObserver.observe(native);

    this._onResize();

    this.zone.runOutsideAngular(() => this._startLoop());
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.mouseX = -9999;
    this.mouseY = -9999;
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.resizeObserver?.disconnect();
    if (this.canvas) {
      this.renderer.removeChild(this.el.nativeElement, this.canvas);
      this.canvas = null;
    }
  }
}
