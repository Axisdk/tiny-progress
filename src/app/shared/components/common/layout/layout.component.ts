import {ChangeDetectionStrategy, Component, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {BackgroundTypesType} from './core/types/background-types.type';


interface Cell {
  active: boolean;
  delay: number;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutComponent implements OnInit {

  public type: InputSignal<BackgroundTypesType> = input<BackgroundTypesType>('random')

  protected cells: WritableSignal<Cell[]> = signal<Cell[]>([]);

  ngOnInit(): void {
    const cellSize = 60;
    const cols: number = Math.ceil(window.innerWidth / cellSize) + 1;
    const rows: number = Math.ceil(window.innerHeight / cellSize) + 1;

    switch (this.type()) {
      case 'random':
        this.cells.set(this.buildRandom(cols, rows));
        break;
      case 'snake':
        this.cells.set(this.buildSnake(cols, rows));
        break;
      case 'circle':
        this.cells.set(this.buildCircles(cols, rows));
        break;
      case 'squares':
        this.cells.set(this.buildSquares(cols, rows));
        break;
      case 'rain':
        this.cells.set(this.buildRain(cols, rows));
        break;
    }
  }

  /** Тип 1: случайные клетки */
  private buildRandom(cols: number, rows: number): Cell[] {
    return Array.from({length: cols * rows}, (): Cell => ({
      active: Math.random() < 0.07,
      delay: Math.random() * 6,
    }));
  }

  /** Тип 2: змейка — волна проходит по сетке змейкой (чётные строки слева, нечётные справа) */
  private buildSnake(cols: number, rows: number): Cell[] {
    const total = cols * rows;
    const cells: Cell[] = Array.from({length: total}, (): Cell => ({active: false, delay: 0}));

    let step = 0;
    for (let row = 0; row < rows; row++) {
      for (let i = 0; i < cols; i++) {
        const col = row % 2 === 0 ? i : cols - 1 - i;
        const idx = row * cols + col;
        cells[idx].active = step % 7 === 0;
        cells[idx].delay = (step / total) * 10;
        step++;
      }
    }

    return cells;
  }

  /** Тип 3: концентрические круги от центра, каждые 3 клетки — новое кольцо */
  private buildCircles(cols: number, rows: number): Cell[] {
    const total = cols * rows;
    const cells: Cell[] = Array.from({length: total}, (): Cell => ({active: false, delay: 0}));
    const cx = cols / 2;
    const cy = rows / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
        const ring = Math.floor(dist / 3);
        cells[row * cols + col] = {
          active: dist % 3 < 0.9,
          delay: ring * 0.4,
        };
      }
    }

    return cells;
  }

  /** Тип rain: дождь — выбранные колонки пульсируют сверху вниз с нарастающей задержкой */
  private buildRain(cols: number, rows: number): Cell[] {
    const total = cols * rows;
    const cells: Cell[] = Array.from({length: total}, (): Cell => ({active: false, delay: 0}));

    for (let col = 0; col < cols; col++) {
      if (Math.random() > 0.35) continue; // ~35% колонок «дождевые»

      const colOffset = Math.random() * 5; // сдвиг фазы между колонками

      for (let row = 0; row < rows; row++) {
        const idx = row * cols + col;
        cells[idx].active = true;
        // задержка нарастает сверху вниз — капля «падает» вниз
        cells[idx].delay = colOffset + (row / rows) * 4;
      }
    }

    return cells;
  }

  /** Тип 4: случайные блоки 3×3, где центральная клетка НЕ закрашена */
  private buildSquares(cols: number, rows: number): Cell[] {
    const total = cols * rows;
    const cells: Cell[] = Array.from({length: total}, (): Cell => ({active: false, delay: 0}));

    const count = Math.floor(total / 18);
    for (let i = 0; i < count; i++) {
      const cx = Math.floor(Math.random() * (cols - 2)) + 1;
      const cy = Math.floor(Math.random() * (rows - 2)) + 1;
      const delay = Math.random() * 6;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue; // центр не закрашиваем
          const idx = (cy + dy) * cols + (cx + dx);
          if (idx >= 0 && idx < total) {
            cells[idx].active = true;
            cells[idx].delay = delay;
          }
        }
      }
    }

    return cells;
  }
}
