import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;
  @Output() deleted = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  cancel() {
    this.cancelled.emit();
  }
  delete() {
    this.deleted.emit();
  }
}
