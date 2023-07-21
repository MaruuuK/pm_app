import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Boards } from 'src/app/shared/Users-boards.model';
import { ConfigService } from 'src/app/shared/config.service';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
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

  notifyBoardCreated() {
    this.boardCreatedSubject.next();
  }
  notifyBoardDeleted() {
    this.boardDeletedSubject.next();
  }
  getBoards() {
    return this.http.get<Boards[]>(this.configService.apiUrl + '/boards');
  }

  deleteBoard(board: Boards) {
    return this.http.delete<Boards>(
      this.configService.apiUrl + '/boards/' + board._id
    );
  }
}
