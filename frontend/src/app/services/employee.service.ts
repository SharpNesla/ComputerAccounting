import {Injectable} from '@angular/core';
import {EntityRepository, keysToCamel} from "./entity-repository";
import {Employee} from "../entities/employee";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Software} from "../entities/software";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EntityRepository<Employee> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, "employee", []);
  }

  getCurrentUser(): Observable<Employee> {
    return this.httpClient.get<Employee>('api/auth/user')
      .pipe(map(x => keysToCamel(x)));
  }

  protected prepareEntity(entity: Employee): Employee {
    if (entity.Subsidiary != null){
      entity.SubsidiaryId = entity.Subsidiary.Id;
    }

    delete entity.Subsidiary;

    if (entity.Superior != null){
      entity.SuperiorId = entity.Superior.Id;
    }

    delete entity.Superior;

    return super.prepareEntity(entity);
  }
}
