import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/shared/Users-boards.model';
import { CreateTaskService } from './create-task.service';
import { BoardsService } from 'src/app/main-page/main-content/boards.service';

@Component({
  selector: 'pm-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit {
  createTaskForm!: FormGroup;
  isButtonDisabled = false;
  users: Users[] = [];

  constructor(
    private boardsService: BoardsService,
    private createTaskService: CreateTaskService
  ) {}

  ngOnInit(): void {
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      usersOfTask: new FormControl([]),
    });

    this.boardsService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });

    const taskModal = document.getElementById('createTask');
    if (taskModal) {
      taskModal.addEventListener('hidden.bs.modal', () => {
        this.createTaskForm.reset();
      });
    }
  }

  onCreateTask(createColumnForm: FormGroup): void {
    if (!createColumnForm.valid) {
      return;
    }
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.createTaskService.setFormTaskData(createColumnForm);
    this.createTaskService.emitCreateTaskButtonClick();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
  }
}
