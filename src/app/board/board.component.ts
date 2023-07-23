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

  columns!: Column[];
  createColumnsData!: FormGroup;
  boardId!: string;

  private clickEventSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardManagerService: BoardManagerService,
    private createColumnService: CreateColumnService
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

    this.getColumns(this.boardId);

    this.createColumnService
      .getFormData()
      .pipe(take(1))
      .subscribe((formColumnData) => {
        this.createColumnsData = formColumnData;
      });
    this.clickEventSubscription = this.createColumnService
      .onCreateButtonClick()
      .subscribe(() => {
        this.createColumn();
      });
  }

  onOpenModalCreateColumn() {
    this.createColumnService.openModalCreateBoard();
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

  private getColumns(boardId: string) {
    this.isLoading = true;
    this.boardManagerService.getColumns(boardId).subscribe((columns) => {
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
        next: () => {
          this.createColumnService.hideModalCreateBoard();
          this.getColumns(this.boardId);
          this.createColumnsData.reset();
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
          this.createColumnService.hideModalCreateBoard();
        },
      });
  }

  onBackToBoardsList() {
    this.router.navigate(['/main']);
  }

  ngOnDestroy() {
    this.clickEventSubscription.unsubscribe();
  }
}
