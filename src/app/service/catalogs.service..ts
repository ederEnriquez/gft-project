import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  constructor(private http: HttpClient) {}

  cards(): Observable<any> {
    return this.http.get(
      'https://mighty-refuge-81707.herokuapp.com/api/catalogs/cards'
    );
  }
}
