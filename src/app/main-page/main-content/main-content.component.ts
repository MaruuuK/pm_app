import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BoardsManagerService } from './boardsManager.service';
import { Boards } from 'src/app/shared/Users-boards.model';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'pm-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  isLoading = false;
  faXmark = faXmark;
  boards: Boards[] = [];
  alertMessage = '';
  deletedBoard!: Boards;

  constructor(
    private boardsManagerService: BoardsManagerService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBoards();
    this.boardsManagerService.boardCreated$.subscribe(() => this.getBoards());
    this.boardsManagerService.boardDeleted$.subscribe(() => {
      this.boardsManagerService.deleteBoard(this.deletedBoard).subscribe(() => {
        this.confirmationService.hideConfirmModal();
        this.getBoards();
      });
    });
  }

  private getBoards() {
    this.isLoading = true;
    this.boardsManagerService.getBoards().subscribe((boards) => {
      this.boards = boards;
      this.isLoading = false;
    });
  }

  onDeleteBoard(board: Boards) {
    this.confirmationService.showConfirmModal();
    this.alertMessage = `"${board.title}" board`;
    this.deletedBoard = board;
  }

  OnNavigateToBoard(board: Boards) {
    this.router.navigate(['/main/board', board.title], {
      queryParams: { id: board._id },
    });
    console.log(board._id);
  }
}
