import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';


import {
  faArrowRightToBracket,
  faUserPlus,
  faPlus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

  //fontawesome
  faArrowRightToBracket = faArrowRightToBracket;
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;

  //ShowBurgerMenu
  navbarShow = false;
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.navbarShow = false;
    }
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();

  }
}
