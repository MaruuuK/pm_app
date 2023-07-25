import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';
import { Task } from '../create-task/task.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskService {
  private clickUpdateTask = new Subject<any>();
  updateTask$ = this.clickUpdateTask.asObservable();

  private formUpdateTaskDataSubject = new Subject<any>();
  private updateTaskButtonClickSubject = new Subject<void>();

  emitUpdateTaskEvent(task: Task) {
    this.clickUpdateTask.next(task);
  }

  private updateTaskModal: Modal | null = null;

  openModalUpdateTask() {
    const updateTaskModal = document.getElementById('updateTask');
    if (updateTaskModal) {
      this.updateTaskModal = new Modal(updateTaskModal);
      this.updateTaskModal.show();
    }
  }

  hideModalUpdateTask() {
    this.updateTaskModal?.hide();
    this.updateTaskModal = null;
  }

  setFormUpdateTaskData(formTaskData: FormGroup) {
    this.formUpdateTaskDataSubject.next(formTaskData);
  }

  emitUpdateTaskButtonClick() {
    this.updateTaskButtonClickSubject.next();
  }

  updateTaskButtonClick() {
    return this.updateTaskButtonClickSubject.asObservable();
  }

  getFormUpdateTaskData() {
    return this.formUpdateTaskDataSubject.asObservable();
  }
}
