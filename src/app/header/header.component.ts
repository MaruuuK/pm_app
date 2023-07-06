import { Component, ElementRef, HostListener } from '@angular/core';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private elementRef: ElementRef) { }

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
