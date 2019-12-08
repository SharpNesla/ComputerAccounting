import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {Roles} from "../entities/employee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisibilitiesService {

  get Directors(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x){
          return x.Role == Roles.Director || x.Role == Roles.BranchDirector;
        }else {
          return false;
        }
      }));
  }

  get LeadDirectorsAndAdmins(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x){
          return x.Role == Roles.Director || x.Role == Roles.LeadAdmin
        }else {
          return false;
        }
      }));
  }

  get NotResponsible(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x){
          return x.Role != Roles.Responsible;
        }else {
          return false;
        }
      }));
  }

  get AllDirectorsAndAdmins(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x){
          return x.Role == Roles.Director || x.Role == Roles.BranchDirector
            ||x.Role == Roles.LeadAdmin || x.Role == Roles.BranchAdmin;
        }else {
          return false;
        }
      }));
  }

  constructor(private auth: AuthService) {

  }
}
