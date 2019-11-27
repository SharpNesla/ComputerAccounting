import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Employee} from "../entities/employee";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  public get currentUser(): Observable<Employee> {
    return this.http.get<Employee>(`api/auth/user`);
  }

  isLogin(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`api/auth/login`, {username, password})

      .pipe(map(response => {
        localStorage.setItem('jwt', response);
        return response;
      }));
  }

  logout() {
    return this.http.get<any>(`api/auth/logout`).pipe(
      map(x => {
        localStorage.removeItem('access_token');
        return x;
      }));
  }
}

