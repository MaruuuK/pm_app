import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pm-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.css'],
})
export class HeaderComponent {
  constructor(private elementRef: ElementRef, private router: Router) {}

  //fontawesome
  faArrowRightToBracket = faArrowRightToBracket;
  faUserPlus = faUserPlus;

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

}
