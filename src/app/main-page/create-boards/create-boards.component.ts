import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardsService } from './createBoards.service';
import { Users } from './Users-boards.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/welcome-page/auth/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      usersOfBoard: new FormControl([], [Validators.required]),
    });

    this.createBoardsService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });
  }

  closeModalWindow(e: Event) {
    this.createBoardsService.closeModal();
    e.preventDefault();
    this.createBoardForm.reset();
  }

  onCreate(createBoardForm: FormGroup, e: Event) {
    if (!createBoardForm.valid) {
      return;
    }

    const title = createBoardForm.value.title;
    const owner = this.authService.user.value!.id;
    const selectedUsers = createBoardForm.get('usersOfBoard')?.value;

    this.createBoardsService
      .createBoard(title, owner, selectedUsers)
      .subscribe({
        next: () => {},
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
      });
    this.closeModalWindow(e);
    this.createBoardForm.reset();
  }
}
