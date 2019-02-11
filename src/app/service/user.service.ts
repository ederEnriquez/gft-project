import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { AuthModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(
      'https://mighty-refuge-81707.herokuapp.com/api/auth/user/create',
      user,
      {}
    );
  }

  authenticate(auth: AuthModel): Observable<any> {
    return this.http.post<AuthModel>(
      'https://mighty-refuge-81707.herokuapp.com/api/auth/user/authenticate',
      auth,
      {}
    );
  }
}
