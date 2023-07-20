import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Boards } from 'src/app/shared/Users-boards.model';
import { ConfigService } from 'src/app/shared/config.service';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
  private boardCreatedSubject = new Subject<void>();
  boardCreated$ = this.boardCreatedSubject.asObservable();

  notifyBoardCreated() {
    this.boardCreatedSubject.next();
  }
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getBoards() {
    return this.http.get<Boards[]>(this.configService.apiUrl + '/boards');
  }

  deleteBoard(board: Boards) {
    return this.http.delete<Boards>(this.configService.apiUrl + '/boards/' + board._id);
  }
}
