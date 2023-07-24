import { Component, Input } from '@angular/core';
import { BoardManagerService } from 'src/app/board/boardManager.service';
import { BoardsService } from 'src/app/main-page/main-content/boards.service';

@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;

  constructor(
    private boardsService: BoardsService,
    private boardManagerService: BoardManagerService
  ) {}

  delete() {
    this.boardsService.notifyBoardDeleted();
    this.boardManagerService.notifyColumnDeleted();
    this.boardManagerService.notifyTaskDeleted();
  }
}
