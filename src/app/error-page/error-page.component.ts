import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  constructor(private router: Router) {}
  onMainPage() {
    this.router.navigate(['/']);
  }
}
