import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateColumnService {
  private formDataSubject = new Subject<FormGroup>();
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

  setFormData(formData: FormGroup) {
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
