import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardsService } from './createBoards.service';
import { Users } from '../../shared/Users-boards.model';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';
import { BoardsManagerService } from '../main-content/boardsManager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-create-boards',
  templateUrl: './create-boards.component.html',
  styleUrls: ['./create-boards.component.css'],
})
export class CreateBoardsComponent {
  createBoardForm!: FormGroup;
  users: Users[] = [];
  isLoading = false;
  error: string | null = null;
  constructor(
    private createBoardsService: CreateBoardsService,
    private authService: AuthService,
    private boardsManagerService: BoardsManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      usersOfBoard: new FormControl([]),
    });

    this.createBoardsService.getUsers().subscribe((users: Users[]) => {
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

    const title = createBoardForm.value.title;
    const owner = this.authService.user.value!.id;
    let selectedUsers = createBoardForm.get('usersOfBoard')?.value;
    if (selectedUsers === null) {
      selectedUsers = [];
    }

    this.createBoardsService
      .createBoard(title, owner, selectedUsers)
      .subscribe({
        next: () => {
          this.boardsManagerService.notifyBoardCreated();
          this.createBoardsService.hideModalCreateBoard();
          this.router.navigate(['/main']);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
      });
  }
}
