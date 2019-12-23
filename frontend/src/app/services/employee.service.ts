import {Injectable} from '@angular/core';
import {EntityServiceBase, keysToCamel} from './entity-service-base';
import {Employee} from '../entities/employee';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Software} from '../entities/software';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EntityServiceBase<Employee> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'employee');
  }

  getCurrentUser(): Observable<Employee> {
    return this.httpClient.get<Employee>('api/auth/user')
      .pipe(map(x => keysToCamel(x)));
  }

  protected prepareEntitySave(entity: Employee): Employee {
    if (entity.Subsidiary != null) {
      entity.SubsidiaryId = entity.Subsidiary.Id;
    } else {
      entity.SubsidiaryId = null;
    }


    if (entity.Superior != null) {
      entity.SuperiorId = entity.Superior.Id;
    }

    entity.Subsidiary = undefined;
    entity.Superior = undefined;

    return super.prepareEntitySave(entity);
  }

  public getDirectorDashboardInfo() {
    return this.httpClient.get('/api/auth/director-dashboard-info')
      .pipe(map(x => keysToCamel(x)));
  }
}
