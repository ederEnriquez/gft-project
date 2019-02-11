export class AuthModel {
  constructor(private email: string = null, private password: string = null) {}

  valid() {
    return this.email && this.password;
  }
}
