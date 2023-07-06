import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'pm-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.css'],
})
export class SlideToggleComponent {
  isEnglish = true;
  color = '#fff';
  checked = true;
  disabled = false;

  onLanguageToggleChange(event: MatSlideToggleChange) {
    this.isEnglish = event.checked;
  }
}
