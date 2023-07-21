import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardManagerService } from 'src/app/main-page/main-content/boardManager.service';

@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;

  constructor(private boardManager: BoardManagerService) { }

  delete() {
  }
}
