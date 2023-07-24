import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faPlus,
  faArrowLeft,
  faCheck,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { BoardManagerService } from './boardManager.service';
import { Column } from './create-columns/column.model';
import { CreateColumnService } from './create-columns/create-column.service';
import { FormGroup } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { ConfirmationService } from '../shared/confirmation-modal/confirmation.service';
import { CreateTaskService } from './create-task/create-task.service';
import { AuthService } from '../welcome-page/auth/auth.service';

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

  boardTitle!: string;
  isLoading = false;
  error: string | null = null;
  editingTitle = false;
  alertMessage = '';

  boardId!: string;

  columns!: Column[];
  columnId!: string;
  createColumnsData!: FormGroup;
  deletedColumn!: Column;
  deletedColumnOrder!: number;

  createTaskData!: FormGroup;

  private clickEventSubscriptionColumn!: Subscription;
  private clickEventSubscriptionTask!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardManagerService: BoardManagerService,
    private createColumnService: CreateColumnService,
    private confirmationService: ConfirmationService,
    private createTaskService: CreateTaskService,
    private authService: AuthService
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
        console.log(boardId);
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
  }

  onOpenModalCreateColumn() {
    this.createColumnService.openModalCreateColumn();
  }

  onChangeTitle() {
    this.editingTitle = true;
  }

  OnCancelChangeTitle() {
    this.editingTitle = false;
  }

  onUpdateColumnTitle(column: Column) {
    const columnId = column._id;
    const columnTitle = column.title;
    const columnOrder = column.order;

    this.boardManagerService
      .updateColumnTitle(this.boardId, columnId, columnTitle, columnOrder)
      .subscribe({
        next: () => {
          this.editingTitle = false;
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
      });
  }

  onDeleteColumn(e: Event, column: Column) {
    this.confirmationService.showConfirmModal();
    this.alertMessage = `"${column.title}" column`;
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
    const column: Column | undefined = this.columns.find((column) => {
      return this.columnId === column._id;
    });
    if (column && !column?.hasOwnProperty('tasks')) {
      column.tasks = [];
    }
    const title = this.createTaskData.value.title;
    const order =
      column?.tasks?.length !== undefined ? column.tasks.length + 1 : 0;
    const description =
      this.createTaskData.value?.description === null
        ? ''
        : this.createTaskData.value?.description;
    const userId = this.authService.user.value!.id;
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

  onBackToBoardsList() {
    this.router.navigate(['/main']);
  }

  ngOnDestroy() {
    this.clickEventSubscriptionColumn.unsubscribe();
    this.clickEventSubscriptionTask.unsubscribe();
  }
}
