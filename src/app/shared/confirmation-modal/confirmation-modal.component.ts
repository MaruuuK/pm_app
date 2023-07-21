import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardsManagerService } from 'src/app/main-page/main-content/boardsManager.service';

@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;

  constructor(private boardsManager: BoardsManagerService) {}

  delete() {
    this.boardsManager.notifyBoardDeleted();
  }
}
