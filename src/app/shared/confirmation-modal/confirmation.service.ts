import { Injectable } from '@angular/core';
import { Boards } from '../Users-boards.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  board!: Boards | null;

  showModal(board: Boards) {
    const modalCreateBoard = document.getElementById('confirmation-modal');
    if (modalCreateBoard) {
      modalCreateBoard.style.display = 'block';
    }
    this.board = board;
  }

  cancelDeletion() {
    const modalCreateBoard = document.getElementById('confirmation-modal');
    if (modalCreateBoard) {
      modalCreateBoard.style.display = 'block';
    }
    this.board = null;
  }
}
