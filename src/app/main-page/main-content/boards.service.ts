import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { Boards, Users } from 'src/app/shared/Users-boards.model';
import { ConfigService } from 'src/app/shared/config.service';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private boardCreatedSubject = new Subject<void>();
  boardCreated$ = this.boardCreatedSubject.asObservable();
  private boardDeletedSubject = new Subject<void>();
  boardDeleted$ = this.boardDeletedSubject.asObservable();
  constructor(private http: HttpClient, private configService: ConfigService) {}

  openModalCreateBoard() {
    const boardModal = document.getElementById('createBoard');
    if (boardModal) {
      const boardModalBS = new Modal(boardModal);
      boardModalBS.show();
    }
  }

  notifyBoardDeleted() {
    this.boardDeletedSubject.next();
  }

  getBoards() {
    return this.http.get<Boards[]>(this.configService.apiUrl + '/boards');
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

  deleteBoard(board: Boards) {
    return this.http.delete<Boards>(
      this.configService.apiUrl + '/boards/' + board?._id
    );
  }

  getUsers() {
    return this.http.get<Users[]>(this.configService.apiUrl + '/users');
  }
}
