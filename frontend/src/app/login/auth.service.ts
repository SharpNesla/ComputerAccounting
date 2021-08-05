import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap, publishLast, refCount} from 'rxjs/operators';
import {EmployeeExtension} from '../entities/employee';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private current: Observable<EmployeeExtension>;

  public get CurrentEmployee(): Observable<EmployeeExtension> {
    return this.current;
  }

  constructor(private http: HttpClient,
              private router: Router,
              private employeeService: EmployeeService) {
    if (this.isLogin()) {
      this.current = this.employeeService.getCurrentUser().pipe(publishLast(), refCount());
    }
  }

  isLogin(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`api/auth/login`, {username, password})
      .pipe(map(response => {
        localStorage.setItem('access_token', response.access_token);
        this.current = this.employeeService.getCurrentUser().pipe(publishLast(), refCount());
        return response;
      }));
  }

  logout() {
    if (this.isLogin()) {
      this.http.get<any>(`api/auth/logout`).subscribe(x => {
        localStorage.removeItem('access_token');
      });
    } else {
      localStorage.removeItem('access_token');
    }
  }
}

