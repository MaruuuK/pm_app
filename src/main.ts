import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

const noop = () => {};
if (!localStorage.getItem('matWarningDisplayed')) {
  console.warn = noop;
  localStorage.setItem('matWarningDisplayed', 'true');
}

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
