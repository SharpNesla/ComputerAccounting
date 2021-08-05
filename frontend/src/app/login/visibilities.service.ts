import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Roles} from '../entities/employee';
import {Observable} from 'rxjs';


// Injectable service that has methods, returns converted observables
// defining visibilities of roles
@Injectable({
  providedIn: 'root'
})
export class VisibilitiesService {

  get Directors(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role == Roles.Director || x.Role == Roles.BranchDirector;
        } else {
          return false;
        }
      }));
  }

  get BranchDirectorsAndAdmins(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role == Roles.BranchAdmin || x.Role == Roles.BranchDirector;
        } else {
          return false;
        }
      }));
  }

  get LeadDirectorsAndAdmins(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role == Roles.Director || x.Role == Roles.LeadAdmin;
        } else {
          return false;
        }
      }));
  }
  get DirectorsAndLeadAdmins(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role == Roles.Director || x.Role == Roles.LeadAdmin || x.Role == Roles.BranchDirector;
        } else {
          return false;
        }
      }));
  }


  get NotResponsible(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role != Roles.Responsible;
        } else {
          return false;
        }
      }));
  }

  get AllDirectorsAndAdmins(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role == Roles.Director || x.Role == Roles.BranchDirector
            || x.Role == Roles.LeadAdmin || x.Role == Roles.BranchAdmin;
        } else {
          return false;
        }
      }));
  }

  get AllExceptStoreKeeper(): Observable<boolean> {
    return this.auth.CurrentEmployee.pipe(
      map(x => {
        if (x) {
          return x.Role == Roles.Director || x.Role == Roles.BranchDirector
            || x.Role == Roles.LeadAdmin || x.Role == Roles.BranchAdmin
            || x.Role == Roles.Responsible;
        } else {
          return false;
        }
      }));
  }

  constructor(private auth: AuthService) {

  }
}
