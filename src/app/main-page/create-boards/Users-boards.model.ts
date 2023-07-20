export interface Users {
  _id: string;
  name: string;
  login: string;
}


export interface getBoards {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}
