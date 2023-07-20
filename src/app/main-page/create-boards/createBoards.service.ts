import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { Users, getBoards } from './Users-boards.model';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CreateBoardsService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  openModalCreateBoard() {
    const modalCreateBoard = document.getElementById('createBoard');
    if (modalCreateBoard) {
      modalCreateBoard.style.display = 'block';
    }
  }

  closeModal() {
    const modalCreateBoard = document.getElementById('createBoard');
    if (modalCreateBoard) {
      modalCreateBoard.style.display = 'none';
    }
  }

  getUsers() {
    return this.http.get<Users[]>(this.configService.apiUrl + '/users');
  }

  createBoard(title: string, owner: string | null, users: string[]) {
    return this.http.post<getBoards>(this.configService.apiUrl + '/boards', {
      title: title,
      owner: owner,
      users: users,
    }).pipe(catchError(this.handleError.bind(this)));;
  }

private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'Something went wrong. Please try later';
  if (!errorRes.error?.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }
}

