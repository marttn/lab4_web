import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './auth/user.model';
const url = 'http://localhost:9000/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${url}`);
  }

  register(user: User) {
    return this.http.post(`${url}/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${url}/${id}`);
  }
}
