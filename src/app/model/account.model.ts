export class AccountModel {
  constructor(
    private userId: string = null,
    public type: string = null,
    public name: string = null
  ) {}

  valid() {
    return this.type;
  }

  format() {
    const copy = Object.assign({}, this);
    copy.userId = sessionStorage.getItem('id');
    return copy;
  }
}
