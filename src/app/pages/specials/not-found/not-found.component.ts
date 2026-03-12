import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutComponent } from '../../../shared/components/common/layout/layout.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [LayoutComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  constructor(
    private _router: Router,
  ) {}

  protected goMain(): void {
    this._router.navigate(['/']);
  };
}
