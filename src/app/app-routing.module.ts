import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome-page/welcome.component';
import { LogInComponent } from './welcome-page/log-in/log-in.component';
import { SignUpComponent } from './welcome-page/sign-up/sign-up.component';
import { MainWelcomeComponent } from './welcome-page/main-welcome/main-welcome.component';
import { MainComponent } from './main-page/main.component';
import { EditProfileComponent } from './main-page/edit-profile/edit-profile.component';
import { AuthGuard } from './welcome-page/auth/auth.guard';
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { CreateBoardsComponent } from './main-page/create-boards/create-boards.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', component: MainWelcomeComponent },
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainContentComponent },
      {
        path: 'createBoards',
        component: CreateBoardsComponent,
        redirectTo: 'main',
      },
      {
        path: 'editProfile',
        component: EditProfileComponent,
      },
      {
        path: 'board/:title',
        component: BoardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
