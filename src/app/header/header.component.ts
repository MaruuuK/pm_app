import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  faArrowRightToBracket,
  faUserPlus,
  faPlus,
  faPenToSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';
import { CreateBoardsService } from '../main-page/create-boards/createBoards.service';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  public isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private createBoardsService: CreateBoardsService
  ) {}

  //fontawesome
  public faArrowRightToBracket: IconDefinition = faArrowRightToBracket;
  public faUserPlus: IconDefinition = faUserPlus;
  public faPenToSquare: IconDefinition = faPenToSquare;
  public faPlus: IconDefinition = faPlus;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onRedirectPage() {
    if (this.isAuthenticated) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/']);
    }
  }

  onLogout(e: Event) {
    this.authService.logout();
    e.preventDefault();
  }

  onCreateBoard() {
    this.router.navigate(['/main']);
    this.createBoardsService.openModalCreateBoard();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
