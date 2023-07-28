import { Component, OnInit, OnDestroy } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from './boards.service';
import { Boards } from 'src/app/shared/Users-boards.model';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CreateBoardsService } from '../create-boards/createBoards.service';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Task } from 'src/app/board/create-task/task.model';


@Component({
  selector: 'pm-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit, OnDestroy {
  isLoading = false;
  faXmark = faXmark;
  boards: Boards[] = [];
  alertMessage = '';
  deletedBoard!: Boards;
  formBoardData!: FormGroup;
  taskSearch: Task[] = [];
  error = '';

  private clickEventSubscriptionBoard!: Subscription;

  constructor(
    private boardsService: BoardsService,
    private createBoardsService: CreateBoardsService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
  ) {

  }

  ngOnInit() {
    this.getBoards();

    this.createBoardsService
      .getFormBoardData()
      .pipe(take(1))
      .subscribe((formBoardData) => {
        this.formBoardData = formBoardData;
      });

    this.clickEventSubscriptionBoard = this.createBoardsService
      .createBoardButtonClick()
      .subscribe(() => {
        this.createBoard();
      });
  }

  private getBoards() {
    this.isLoading = true;
    this.boardsService.getBoards().subscribe((boards) => {
      this.boards = boards;
      this.isLoading = false;
    });
  }

  private createBoard() {
    this.error = '';
    const title = this.formBoardData.value.title;
    const owner = this.authService.user.value?.id ?? null;
    let users = this.formBoardData.get('usersOfBoard')?.value;
    if (users === null) {
      users = [];
    }

    this.boardsService.createBoard(title, owner, users).subscribe({
      next: (board) => {
        this.createBoardsService.hideModalCreateBoard();
        this.formBoardData.reset();
        this.boards.push(board);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.createBoardsService.hideModalCreateBoard();
        this.formBoardData.reset();
      },
    });
  }

  onDeleteBoard(e: Event, board: Boards) {
    this.confirmationService.showConfirmModal();
    this.deletedBoard = board;
    e.stopPropagation();
    this.alertMessage = this.translateService.instant(
      'confirmAlert.deleteBoard',
      { boardTitle: board.title }
    );
  }

  onDeleteEvent() {
    this.boardsService.deleteBoard(this.deletedBoard).subscribe(() => {
      this.confirmationService.hideConfirmModal();
      this.boards = this.boards.filter((board) => {
        return board._id !== this.deletedBoard._id;
      });
    });
  }
  OnNavigateToBoard(board: Boards) {
    this.router.navigate(['/main/board', board.title], {
      queryParams: { id: board._id },
    });
  }

  ngOnDestroy(): void {
    this.clickEventSubscriptionBoard.unsubscribe();
  }
}
