import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoardManagerService } from 'src/app/board/boardManager.service';


@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;
  @Output() deleteEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private boardManagerService: BoardManagerService) {}

  delete() {
    this.deleteEvent.emit();
    this.boardManagerService.notifyColumnDeleted();
    this.boardManagerService.notifyTaskDeleted();
  }
  cancel() {
    this.cancelEvent.emit();
  }
}
