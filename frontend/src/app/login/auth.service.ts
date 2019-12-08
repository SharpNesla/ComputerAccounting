import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, mergeMap} from "rxjs/operators";
import {Employee} from "../entities/employee";
import {EmployeeService} from "../services/employee.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private current: BehaviorSubject<Employee> = new BehaviorSubject<Employee>(null);

  public get CurrentEmployee() {
    return this.current;
  }

  constructor(private http: HttpClient,
              private router: Router,
              private employeeService: EmployeeService) {
    if (this.isLogin()) {
      this.employeeService.getCurrentUser().subscribe(x => {
          this.CurrentEmployee.next(x);
        }
      );
    }
  }

  isLogin(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`api/auth/login`, {username, password})
      .pipe(map(response => {
        localStorage.setItem('access_token', response['access_token']);
        this.employeeService.getCurrentUser().subscribe(x => {
          this.CurrentEmployee.next(x);
        });
        return response;
      }));
  }

  logout() {
    this.http.get<any>(`api/auth/logout`).subscribe(x => {
        localStorage.removeItem('access_token');
      }
    );
  }
}

