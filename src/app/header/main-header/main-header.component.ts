import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRightToBracket,
  faPenToSquare,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pm-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent {
  constructor(private elementRef: ElementRef, private router: Router) {}
  //fontawesome
  faArrowRightToBracket = faArrowRightToBracket;
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


}
