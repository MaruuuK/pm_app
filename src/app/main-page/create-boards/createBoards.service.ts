import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { Subject } from 'rxjs';
import { Modal } from 'bootstrap';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateBoardsService {
  private formBoardDataSubject = new Subject<FormGroup>();
  private createBoardButtonClickSubject = new Subject<void>();

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

  setFormBoardData(formBoardData: FormGroup) {
    this.formBoardDataSubject.next(formBoardData);
  }

  emitCreateBoardButtonClick() {
    this.createBoardButtonClickSubject.next();
  }

  createBoardButtonClick() {
    return this.createBoardButtonClickSubject.asObservable();
  }

  getFormBoardData() {
    return this.formBoardDataSubject.asObservable();
  }
}
