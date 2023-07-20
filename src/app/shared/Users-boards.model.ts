export interface Users {
  _id: string;
  name: string;
  login: string;
}


export interface Boards {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}
