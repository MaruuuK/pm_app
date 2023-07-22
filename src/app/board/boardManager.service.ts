import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Column } from './create-columns/column.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
  constructor(private configService: ConfigService, private http: HttpClient) {}

  getColumns(boardId: string) {
    return this.http.get<Column[]>(
      this.configService.apiUrl + `/boards/${boardId}/columns`
    );
  }

  createColumn(boardId: string, title: string, order: number) {
    return this.http
      .post<Column>(
        this.configService.apiUrl + `/boards/${boardId}/columns`,
        {
          'title': title,
          'order': order,
       }
      )
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
