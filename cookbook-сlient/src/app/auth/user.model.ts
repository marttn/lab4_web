export class User {
  login: string;
  password: string;
  liked: string;

  constructor(login: string, password: string, liked: string) {
    this.login = login;
    this.password = password;
    this.liked = liked;
  }
}
