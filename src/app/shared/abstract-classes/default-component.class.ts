import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DefaultComponentClass implements OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  protected constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
