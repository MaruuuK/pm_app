import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faPlus,
  faArrowLeft,
  faCheck,
  faBan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { BoardManagerService } from './boardManager.service';
import { Column } from './create-columns/column.model';
import { CreateColumnService } from './create-columns/create-column.service';
import { FormGroup } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { ConfirmationService } from '../shared/confirmation-modal/confirmation.service';
import { CreateTaskService } from './create-task/create-task.service';
import { AuthService } from '../welcome-page/auth/auth.service';
import { Task } from './create-task/task.model';
import { UpdateTaskService } from './update-task/update-task.service';
import { TranslateService } from '@ngx-translate/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'pm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faCheck = faCheck;
  faBan = faBan;
  faXmark = faXmark;

  boardTitle!: string;
  isLoading = false;
  error: string | null = null;
  alertMessage = '';

  boardId!: string;

  columns!: Column[];
  columnId!: string;
  createColumnsData!: FormGroup;
  deletedColumn!: Column;
  deletedColumnOrder!: number;

  createTaskData!: FormGroup;
  updateTaskData!: FormGroup;
  updatedTask!: Task | undefined;
  deletedTask!: Task;

  private clickEventSubscriptionColumn!: Subscription;
  private clickEventSubscriptionTask!: Subscription;
  private clickEventSubscriptionUpdateTask!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardManagerService: BoardManagerService,
    private createColumnService: CreateColumnService,
    private confirmationService: ConfirmationService,
    private createTaskService: CreateTaskService,
    private authService: AuthService,
    private updateTaskService: UpdateTaskService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const boardTitle = params.get('title');
      if (boardTitle) {
        this.boardTitle = boardTitle;
      }
    });

    this.route.queryParamMap.subscribe((params) => {
      const boardId = params.get('id');
      if (boardId) {
        this.boardId = boardId;
      }
    });

    this.getColumnsAndTasks(this.boardId);

    this.createColumnService
      .getFormData()
      .pipe(take(1))
      .subscribe((formColumnData) => {
        this.createColumnsData = formColumnData;
      });

    this.clickEventSubscriptionColumn = this.createColumnService
      .createButtonClick()
      .subscribe(() => {
        this.createColumn();
      });

    this.boardManagerService.columnDeleted$.subscribe(() => {
      this.boardManagerService
        .deleteColumn(this.boardId, this.deletedColumn)
        .subscribe(() => {
          this.confirmationService.hideConfirmModal();
          this.columns = this.columns.filter((column) => {
            return column._id !== this.deletedColumn._id;
          });
          this.updateOrder();
        });
    });

    this.boardManagerService.taskDeleted$.subscribe(() => {
      this.boardManagerService
        .deleteTask(this.boardId, this.columnId, this.deletedTask)
        .subscribe(() => {
          this.confirmationService.hideConfirmModal();
          const columnToUpdate = this.columns.find(
            (column) => column._id === this.deletedTask.columnId
          );
          if (columnToUpdate) {
            const taskIndex = columnToUpdate.tasks?.findIndex(
              (task) => task._id === this.deletedTask._id
            );
            if (taskIndex !== undefined && taskIndex !== -1) {
              columnToUpdate.tasks?.splice(taskIndex, 1);
            }
            this.updateOrder();
          }
        });
    });

    this.createTaskService
      .getFormTaskData()
      .pipe(take(1))
      .subscribe((formTaskData) => {
        this.createTaskData = formTaskData;
      });

    this.clickEventSubscriptionTask = this.createTaskService
      .createTaskButtonClick()
      .subscribe(() => {
        this.createTask();
      });

    this.updateTaskService
      .getFormUpdateTaskData()
      .pipe(take(1))
      .subscribe((formUpdateTaskData) => {
        this.updateTaskData = formUpdateTaskData;
      });

    this.clickEventSubscriptionUpdateTask = this.updateTaskService
      .updateTaskButtonClick()
      .subscribe(() => {
        this.updateTask();
      });
  }

  onDropColumn(event: CdkDragDrop<Column[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updateOrder();
    this.updateColumnsSet();
  }

  onDropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateOrder();
    this.updateTasksSet();
  }

  updateOrder() {
    this.columns.forEach((column, index) => {
      column.tasks.forEach((task, index) => {
        task.order = index + 1;
        task.columnId = column._id;
      });
      column.order = index + 1;
    });
  }

  updateTasksSet() {
    const tasksOnServer: {
      _id: string;
      order: number;
      columnId: string;
    }[] = [];
    this.columns.forEach((column) => {
      column.tasks.forEach((task) => {
        tasksOnServer.push({
          _id: task._id,
          order: task.order,
          columnId: task.columnId,
        });
      });
    });

    this.boardManagerService.updateTaskSet(tasksOnServer).subscribe({
      error: (errorMessage) => {
        this.error = errorMessage;
      },
    });
  }

  updateColumnsSet() {
    const columnsOnServer: {
      _id: string;
      order: number;
    }[] = [];
    this.columns.forEach((column) => {
      columnsOnServer.push({ _id: column._id, order: column.order });
    });

    this.boardManagerService.updateColumnSet(columnsOnServer).subscribe({
      error: (errorMessage) => {
        this.error = errorMessage;
      },
    });
  }

  onOpenModalCreateColumn() {
    this.createColumnService.openModalCreateColumn();
  }

  onUpdateColumnTitle(column: Column) {
    const columnId = column._id;
    const columnTitle = column.title;
    const columnOrder = column.order;
    this.error = '';
    column.editingTitle = false;

    this.boardManagerService
      .updateColumnTitle(this.boardId, columnId, columnTitle, columnOrder)
      .subscribe({
        next: () => {
          column.editingTitle = false;
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
      });
  }

  onDeleteColumn(e: Event, column: Column) {
    this.confirmationService.showConfirmModal();
    this.alertMessage = this.translateService.instant(
      'confirmAlert.deleteColumn',
      { columnTitle: column.title }
    );
    this.deletedColumn = column;
    e.stopPropagation();
  }

  private getColumnsAndTasks(boardId: string) {
    this.isLoading = true;
    this.boardManagerService
      .getColumnsAndTasks(boardId)
      .subscribe((columns) => {
        this.columns = columns;
        this.isLoading = false;
      });
  }

  private createColumn() {
    this.error = '';
    const title = this.createColumnsData.value.title;
    const order = this.columns.length + 1;

    this.boardManagerService
      .createColumn(this.boardId, title, order)
      .subscribe({
        next: (column) => {
          this.createColumnService.hideModalCreateColumn();
          this.createColumnsData.reset();
          this.columns.push(column);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.createColumnService.hideModalCreateColumn();
          this.createColumnsData.reset();
        },
      });
  }

  private createTask() {
    this.error = '';
    const column: Column | undefined = this.columns.find((column) => {
      return this.columnId === column._id;
    });
    if (column && !Object.prototype.hasOwnProperty.call(column, 'tasks')) {
      column.tasks = [];
    }
    const title = this.createTaskData.value.title;
    const order =
      column?.tasks?.length !== undefined ? column.tasks.length + 1 : 0;
    const description =
      this.createTaskData.value?.description === null
        ? ''
        : this.createTaskData.value?.description;
    const userId = this.authService.user.value?.id ?? null;
    const selectedUsers =
      this.createTaskData.value?.usersOfTask === null
        ? []
        : this.createTaskData.value?.usersOfTask;
    this.boardManagerService
      .createTask(
        this.boardId,
        this.columnId,
        title,
        order,
        description,
        userId,
        selectedUsers
      )
      .subscribe({
        next: (task) => {
          this.columns.forEach((column) => {
            if (this.columnId === column._id) {
              column.tasks?.push(task);
            }
          });
          this.createTaskService.hideModalCreateTask();
          this.createTaskData.reset();
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
          this.createTaskService.hideModalCreateTask();
          this.createTaskData.reset();
        },
      });
  }

  onOpenModalCreateTask(columnId: string) {
    this.createTaskService.openModalCreateTask();
    this.columnId = columnId;
  }

  onDeleteTask(e: Event, task: Task, columnId: string) {
    this.confirmationService.showConfirmModal();
    this.alertMessage = this.translateService.instant(
      'confirmAlert.deleteTask',
      { taskTitle: task.title }
    );
    this.deletedTask = task;
    this.columnId = columnId;
    e.stopPropagation();
  }

  updateTask() {
    this.error = '';
    const column = this.columns.find((column) => {
      return column._id === this.updatedTask?.columnId;
    });
    if (column) {
      this.updatedTask = column.tasks?.find((task) => {
        return task._id === this.updatedTask?._id;
      });
    }
    if (this.updatedTask) {
      this.updatedTask.title = this.updateTaskData.value.title;
      this.updatedTask.description = this.updateTaskData.value.description;
      this.updatedTask.users =
        this.updateTaskData.value.usersOfTask === null
          ? []
          : this.updateTaskData.value.usersOfTask;
    }
    this.boardManagerService.updateTask(this.updatedTask).subscribe({
      next: () => {
        this.updateTaskService.hideModalUpdateTask();
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.updateTaskService.hideModalUpdateTask();
      },
    });
  }

  onOpenModalUpdateTask(task: Task) {
    this.updateTaskService.openModalUpdateTask();
    this.updateTaskService.emitUpdateTaskEvent(task);
    this.updatedTask = task;
  }

  onBackToBoardsList() {
    this.router.navigate(['/main']);
  }

  ngOnDestroy() {
    this.clickEventSubscriptionColumn.unsubscribe();
    this.clickEventSubscriptionTask.unsubscribe();
    this.clickEventSubscriptionUpdateTask.unsubscribe();
  }
}
