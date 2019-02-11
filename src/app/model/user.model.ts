export class UserModel {
  constructor(
    private email: string = null,
    private firstname: string = null,
    private lastname: string = null,
    private password: string = null
  ) {}

  valid() {
    return this.email && this.firstname && this.lastname && this.password;
  }
}
