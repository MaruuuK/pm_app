import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './welcome-page/auth/auth-interceptor.service';
import { CreateBoardsComponent } from './main-page/create-boards/create-boards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board/board.component';
import { CreateColumnsComponent } from './board/create-columns/create-columns.component';
import { CreateTaskComponent } from './board/create-task/create-task.component';
import { UpdateTaskComponent } from './board/update-task/update-task.component';
import { ErrorPageComponent } from './error-page/error-page.component';

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
    BoardComponent,
    CreateColumnsComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ErrorPageComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    NgbModule,
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
