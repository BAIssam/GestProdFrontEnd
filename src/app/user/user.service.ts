import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { API_URLS } from '../config/api.url.config';
import { User } from '../shared/user.model';

@Injectable()
export class UserService{

  constructor(private http: HttpClient){}

  getUsers(): Observable<any>{
    return this.http.get(API_URLS.USER_CRUD_URL);
  }

  addUser(u: User): Observable<any>{
    return this.http.post(API_URLS.USER_CRUD_URL, u);
  }

  updateUser(u: User): Observable<any>{
    return this.http.put(API_URLS.USER_CRUD_URL, u);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(API_URLS.USER_CRUD_URL + '/' + id);
  }
}
