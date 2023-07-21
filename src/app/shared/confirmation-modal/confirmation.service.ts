import { EventEmitter, Injectable } from '@angular/core';
import { Boards } from '../Users-boards.model';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private confirmModal: Modal | null = null;

  showConfirmModal() {
    const confirmModal = document.getElementById('confirmationModal');
    if (confirmModal) {
      this.confirmModal = new Modal(confirmModal);
      this.confirmModal.show();
    }
  }

  hideConfirmModal() {
    this.confirmModal?.hide();
    this.confirmModal = null;
  }
}
