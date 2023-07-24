import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Column } from './create-columns/column.model';
import { Observable, Subject, catchError, forkJoin, mergeMap, throwError } from 'rxjs';
import { Task } from './create-task/task.model';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
  private columnDeletedSubject = new Subject<void>();
  columnDeleted$ = this.columnDeletedSubject.asObservable();

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getColumns(boardId: string) {
    return this.http.get<Column[]>(
      this.configService.apiUrl + `/boards/${boardId}/columns`
    );
  }

  getColumnsAndTasks(boardId: string): Observable<Column[]> {
    const columns$ = this.http.get<Column[]>(
      this.configService.apiUrl + `/boards/${boardId}/columns`
    );

    return columns$.pipe(
      mergeMap((columns: Column[]) => {
        const tasksRequests: Observable<Task[]>[] = columns.map((column) =>
          this.http.get<Task[]>(
            this.configService.apiUrl +
              `/boards/${boardId}/columns/${column._id}/tasks`
          )
        );

        return forkJoin(tasksRequests).pipe(
          mergeMap((tasks: Task[][]) => {
            columns.forEach((column, index) => {
              column.tasks = tasks[index];
            });
            return [columns];
          })
        );
      })
    );
  }

  createColumn(boardId: string, title: string, order: number) {
    return this.http
      .post<Column>(this.configService.apiUrl + `/boards/${boardId}/columns`, {
        title: title,
        order: order,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateColumnTitle(
    boardId: string,
    columnId: string,
    columnTitle: string,
    order: number
  ) {
    return this.http
      .put<Column>(
        this.configService.apiUrl + `/boards/${boardId}/columns/${columnId}`,
        {
          title: columnTitle,
          order: order,
        }
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteColumn(boardId: string, column: Column) {
    return this.http.delete<Column>(
      this.configService.apiUrl + `/boards/${boardId}/columns/${column?._id}`
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Something went wrong. Please try later';
    if (!errorRes.error?.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }

  notifyColumnDeleted() {
    this.columnDeletedSubject.next();
  }
}
