import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  constructor(private router: Router) {}

  openModalCreateBoard() {
    const modalCreateBoard = document.getElementById('createBoard');
    if (modalCreateBoard) {
      modalCreateBoard.style.display = 'block';
    }
  }

  closeModal() {
    const modalCreateBoard = document.getElementById('createBoard');
    if (modalCreateBoard) {
      modalCreateBoard.style.display = 'none';
    }
  }
}
