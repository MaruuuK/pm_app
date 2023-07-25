import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/shared/Users-boards.model';
import { Task } from '../create-task/task.model';
import { BoardManagerService } from '../boardManager.service';
import { Subscription } from 'rxjs';
import { UpdateTaskService } from './update-task.service';
import { BoardsService } from 'src/app/main-page/main-content/boards.service';

@Component({
  selector: 'pm-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit, OnDestroy {
  updatedTask!: Task;
  private updateTaskSubscription!: Subscription;

  isLoading = false;
  isButtonDisabled = false;
  users: Users[] = [];
  updateTaskForm!: FormGroup;

  constructor(
    private boardManagerService: BoardManagerService,
    private updateTaskService: UpdateTaskService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.updateTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      usersOfTask: new FormControl([]),
    });

    this.boardsService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });

    this.updateTaskSubscription = this.updateTaskService.updateTask$.subscribe(
      (task) => {
        this.getTaskData(task);
      }
    );

    const updateTaskModal = document.getElementById('updateTask');
    if (updateTaskModal) {
      updateTaskModal.addEventListener('hidden.bs.modal', () => {
        this.updateTaskForm.reset();
      });
    }
  }

  handleButtonClickUpdateTask() {
    this.getTaskData(this.updatedTask);
  }

  private getTaskData(task: Task) {
    this.isLoading = true;
    this.boardManagerService
      .getTask(task.boardId, task.columnId, task._id)
      .subscribe((taskData) => {
        this.updateTaskForm.patchValue({
          title: taskData.title,
          description: taskData.description,
          usersOfTask: taskData.users,
        });
        this.isLoading = false;
      });
  }
  onUpdateTask(updateTaskForm: FormGroup): void {
    if (!updateTaskForm.valid) {
      return;
    }
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.updateTaskService.setFormUpdateTaskData(updateTaskForm);
    this.updateTaskService.emitUpdateTaskButtonClick();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.updateTaskSubscription.unsubscribe();
  }
}
