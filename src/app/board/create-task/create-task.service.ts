import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskService {
  private formTaskDataSubject = new Subject<any>();
  private createTaskButtonClickSubject = new Subject<void>();

  private taskModal: Modal | null = null;

  openModalCreateTask() {
    const taskModal = document.getElementById('createTask');
    if (taskModal) {
      this.taskModal = new Modal(taskModal);
      this.taskModal.show();
    }
  }

  hideModalCreateTask() {
    this.taskModal?.hide();
    this.taskModal = null;
  }

  setFormTaskData(formTaskData: FormGroup) {
    this.formTaskDataSubject.next(formTaskData);
  }

  emitCreateTaskButtonClick() {
    this.createTaskButtonClickSubject.next();
  }

  createTaskButtonClick() {
    return this.createTaskButtonClickSubject.asObservable();
  }

  getFormTaskData() {
    return this.formTaskDataSubject.asObservable();
  }
}
