import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pm-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.css'],
})
export class SlideToggleComponent {
  isEnglish = true;

  constructor(private translateService: TranslateService) {}

  onLanguageToggleChange() {
    this.isEnglish = !this.isEnglish;
    const lang = this.isEnglish ? 'en' : 'ru';
    this.translateService.use(lang);
  }
}
