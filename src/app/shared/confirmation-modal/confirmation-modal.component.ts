import { Component, Input } from '@angular/core';
import { BoardsService } from 'src/app/main-page/main-content/boards.service';

@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;

  constructor(private boardsManager: BoardsService) {}

  delete() {
    this.boardsManager.notifyBoardDeleted();
  }
}
