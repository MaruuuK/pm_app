import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pm-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleComponent {
  isEnglish = true;
  color = '#fff';
  checked = true;
  disabled = false;

  constructor(private translateService: TranslateService) {}

  onLanguageToggleChange() {
    this.isEnglish = !this.isEnglish;
    const lang = this.isEnglish ? 'en' : 'ru';
    this.translateService.use(lang);
  }
}
