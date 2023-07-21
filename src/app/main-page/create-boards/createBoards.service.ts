import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { Users, Boards } from '../../shared/Users-boards.model';
import { catchError, throwError } from 'rxjs';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateBoardsService {
  private boardModal: Modal | null = null;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  openModalCreateBoard() {
    const boardModal = document.getElementById('createBoard');
    if (boardModal) {
      this.boardModal = new Modal(boardModal);
      this.boardModal.show();
    }
  }
  hideModalCreateBoard() {
    this.boardModal?.hide();
    this.boardModal = null;
  }

  getUsers() {
    return this.http.get<Users[]>(this.configService.apiUrl + '/users');
  }

  createBoard(title: string, owner: string | null, users: string[]) {
    return this.http
      .post<Boards>(this.configService.apiUrl + '/boards', {
        title: title,
        owner: owner,
        users: users,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Something went wrong. Please try later';
    if (!errorRes.error?.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }
}
