import {EntityBase, EntityWithAddress} from './entity-base';
import {SubsidiaryExtension} from "./subsidiary";

export enum Roles {
  Director,
  BranchDirector,
  LeadAdmin,
  BranchAdmin,
  Responsible,
  StoreKeeper
}

export enum Gender {
  Male,
  Female,
  Unrecognized
}

export class Employee extends EntityWithAddress{
  Name: string;
  Surname: string;
  Patronymic: string;

  Username: string;

  Role: Roles;
  Gender: Gender = Gender.Unrecognized;

  PassportSerial: string;
  Address: string;

  Subsidiary: SubsidiaryExtension;
  Superior: Employee;
}

export class EmployeeExtension extends Employee {
  SubsidiaryId: number;
  SuperiorId: number;
  Superior : EmployeeExtension;
}
