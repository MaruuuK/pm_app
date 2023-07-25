import { Task } from '../create-task/task.model';
export interface Column extends Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks?: Task[];
}
