import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  accounts(): Observable<any> {
    return this.http.get(
      'https://mighty-refuge-81707.herokuapp.com/api/accounts'
    );
  }

  create(account: AccountModel): Observable<any> {
    return this.http.post<AccountModel>(
      'https://mighty-refuge-81707.herokuapp.com/api/accounts',
      account
    );
  }
}
