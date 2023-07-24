import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateColumnService {
  private formDataSubject = new Subject<any>();
  private createButtonClickSubject = new Subject<void>();
  private columnModal: Modal | null = null;

  openModalCreateColumn() {
    const columnModal = document.getElementById('createColumn');
    if (columnModal) {
      this.columnModal = new Modal(columnModal);
      this.columnModal.show();
    }
  }

  hideModalCreateColumn() {
    this.columnModal?.hide();
    this.columnModal = null;
  }

  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  emitCreateButtonClick() {
    this.createButtonClickSubject.next();
  }

  createButtonClick() {
    return this.createButtonClickSubject.asObservable();
  }

  getFormData() {
    return this.formDataSubject.asObservable();
  }
}
