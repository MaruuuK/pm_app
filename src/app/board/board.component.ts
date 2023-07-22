import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BoardManagerService } from './boardManager.service';
import { Column } from './create-columns/column.model';
import { CreateColumnService } from './create-columns/create-column.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  boardTitle!: string;
  isLoading = false;
  error: string | null = null;

  columns!: Column[];
  createColumnsData!: FormGroup;
  boardId!: string;

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

    this.createColumnService.getFormData().subscribe((formColumnData) => {
      this.createColumnsData = formColumnData;
    });
    this.createColumnService.onCreateButtonClick().subscribe(() => {
      this.createColumn();
    });
  }

  onBackToBoardsList() {
    this.router.navigate(['/main']);
  }

  onOpenModalCreateColumn() {
    this.createColumnService.openModalCreateBoard();
  }

  private getColumns(boardId: string) {
    this.isLoading = true;
    this.boardManagerService.getColumns(boardId).subscribe((columns) => {
      this.columns = columns;
      console.log(this.columns);
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
}
