import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardsService } from './createBoards.service';
import { Users } from '../../shared/Users-boards.model';
import { BoardsService } from '../main-content/boards.service';

@Component({
  selector: 'pm-create-boards',
  templateUrl: './create-boards.component.html',
  styleUrls: ['./create-boards.component.css'],
})
export class CreateBoardsComponent {
  createBoardForm!: FormGroup;
  users: Users[] = [];
  isLoading = false;
  isButtonDisabled = false;
  error: string | null = null;
  constructor(
    private createBoardsService: CreateBoardsService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      usersOfBoard: new FormControl([]),
    });

    this.boardsService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });

    const boardModal = document.getElementById('createBoard');
    if (boardModal) {
      boardModal.addEventListener('hidden.bs.modal', () => {
        this.createBoardForm.reset();
      });
    }
  }

  onCreate(createBoardForm: FormGroup) {
    if (!createBoardForm.valid) {
      return;
    }
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.createBoardsService.setFormBoardData(createBoardForm);
    this.createBoardsService.emitCreateBoardButtonClick();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
  }
}
