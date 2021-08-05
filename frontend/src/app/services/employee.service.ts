import {Injectable} from '@angular/core';
import {EntityServiceBase, keysToCamel} from './entity-service-base';
import {EmployeeExtension} from '../entities/employee';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SoftwareExtension} from '../entities/software';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EntityServiceBase<EmployeeExtension> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'employee');
  }

  getCurrentUser(): Observable<EmployeeExtension> {
    return this.httpClient.get<EmployeeExtension>('api/auth/user')
      .pipe(map(x => keysToCamel(x)));
  }

  protected prepareEntitySave(entity: EmployeeExtension): EmployeeExtension {
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

  public getBranchDirectorDashboardInfo() {
    return this.httpClient.get('/api/auth/branch-director-dashboard-info')
      .pipe(map(x => keysToCamel(x)));
  }
}
