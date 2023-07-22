import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from './boards.service';
import { Boards } from 'src/app/shared/Users-boards.model';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { Router } from '@angular/router';

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
    private boardsService: BoardsService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBoards();
    this.boardsService.boardCreated$.subscribe(() => this.getBoards());
    this.boardsService.boardDeleted$.subscribe(() => {
      this.boardsService.deleteBoard(this.deletedBoard).subscribe(() => {
        this.confirmationService.hideConfirmModal();
        this.getBoards();
      });
    });
  }

  private getBoards() {
    this.isLoading = true;
    this.boardsService.getBoards().subscribe((boards) => {
      this.boards = boards;
      this.isLoading = false;
    });
  }

  onDeleteBoard(e: Event, board: Boards) {
    this.confirmationService.showConfirmModal();
    this.alertMessage = `"${board.title}" board`;
    this.deletedBoard = board;
    e.stopPropagation();
  }

  OnNavigateToBoard(board: Boards) {
    this.router.navigate(['/main/board', board.title], {
      queryParams: { id: board._id },
    });
    console.log(board._id);
  }
}
