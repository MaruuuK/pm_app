export class User {
  constructor(
    public id: string | null,
    public login: string,
    private _token: string,
    private _tokenExpirationDate: Date | null
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
