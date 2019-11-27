import { Injectable } from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {Employee} from "../entities/employee";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EntityRepository<Employee> {
  constructor(httpClient : HttpClient){
    super(httpClient,"employee" ,[]);
  }
}
