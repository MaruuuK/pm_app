import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoardManagerService } from 'src/app/board/boardManager.service';
import { EditProfileService } from 'src/app/main-page/edit-profile/editProfile.service';


@Component({
  selector: 'pm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() message!: string;
  @Output() deleteEvent = new EventEmitter<void>();


  constructor(
    private boardManagerService: BoardManagerService,
    private editProfileService: EditProfileService
  ) {}

  delete() {
    this.deleteEvent.emit();
    this.boardManagerService.notifyColumnDeleted();
    this.boardManagerService.notifyTaskDeleted();
  }
}
