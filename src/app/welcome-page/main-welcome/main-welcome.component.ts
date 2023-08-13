import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pm-main-welcome',
  templateUrl: './main-welcome.component.html',
  styleUrls: ['./main-welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainWelcomeComponent {}
