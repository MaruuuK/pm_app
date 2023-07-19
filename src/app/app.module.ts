import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome-page/welcome.component';
import { MainComponent } from './main-page/main.component';
import { SlideToggleComponent } from './header/slide-toggle/slide-toggle.component';
import { MainWelcomeComponent } from './welcome-page/main-welcome/main-welcome.component';
import { LogInComponent } from './welcome-page/log-in/log-in.component';
import { SignUpComponent } from './welcome-page/sign-up/sign-up.component';
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { EditProfileComponent } from './main-page/edit-profile/edit-profile.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './welcome-page/auth/auth-interceptor.service';
import { CreateBoardsComponent } from './create-boards/create-boards.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    SlideToggleComponent,
    MainWelcomeComponent,
    LogInComponent,
    SignUpComponent,
    MainContentComponent,
    EditProfileComponent,
    ConfirmationModalComponent,
    LoadingSpinnerComponent,
    CreateBoardsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
