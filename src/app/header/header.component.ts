import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  faArrowRightToBracket,
  faUserPlus,
  faPlus,
  faPenToSquare,
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
  isAuthenticated = false;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private createBoardsService: CreateBoardsService
  ) {}

  //fontawesome
  faArrowRightToBracket = faArrowRightToBracket;
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;

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
