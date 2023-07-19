import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../main-page/create.service';

@Component({
  selector: 'pm-create-boards',
  templateUrl: './create-boards.component.html',
  styleUrls: ['./create-boards.component.css'],
})
export class CreateBoardsComponent {
  createBoardForm!: FormGroup;
  constructor(private createService: CreateService) {}

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      usersOfBoard: new FormControl([], [Validators.required]),
    });
  }

  closeModalWindow(e: Event) {
    this.createService.closeModal();
    e.preventDefault();
  }
  onCreate() {}
}
