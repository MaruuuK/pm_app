import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/welcome-header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome-page/welcome.component';
import { MainComponent } from './main-page/main.component';
import { SlideToggleComponent } from './header/slide-toggle/slide-toggle.component';
import { MainWelcomeComponent } from './welcome-page/main-welcome/main-welcome.component';
import { MainHeaderComponent } from './header/main-header/main-header.component';
import { LogInComponent } from './welcome-page/log-in/log-in.component';
import { SignUpComponent } from './welcome-page/sign-up/sign-up.component';
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { EditProfileComponent } from './main-page/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    SlideToggleComponent,
    MainWelcomeComponent,
    MainHeaderComponent,
    LogInComponent,
    SignUpComponent,
    MainContentComponent,
    EditProfileComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
