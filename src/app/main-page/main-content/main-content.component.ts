import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BoardManagerService } from './boardManager.service';
import { Boards } from 'src/app/shared/Users-boards.model';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';


@Component({
  selector: 'pm-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  isLoading = false;
  faXmark = faXmark;
  boards: Boards[] = [];

  constructor(
    private boardManagerService: BoardManagerService,
    private confirmationService: ConfirmationService,

  ) {}

  ngOnInit() {
    this.getBoards();
    this.boardManagerService.boardCreated$.subscribe(() => this.getBoards());
  }

  private getBoards() {
    this.isLoading = true;
    this.boardManagerService.getBoards().subscribe((boards) => {
      this.boards = boards;
      this.isLoading = false;
    });
  }

  onDeleteBoard(board: Boards, modal: any) {
    // this.confirmationService.showModal(board);
    // this.boardManagerService.deleteBoard(board).subscribe(() => {
    //   this.boards.filter((b) => b._id !== board._id);
    //   this.getBoards();
    // })
  }
}
