import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pm-loading-spinner',
  template: `<div class="lds-default">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrls: ['./loading-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
