export class User {
  constructor(public login: string, private _token: string) {}

  get token() {
    return this._token;
  }
}
