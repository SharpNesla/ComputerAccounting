import {EntityBase} from "./entity-base";
import {Subsidiary} from "./subsidiary";

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

export class Employee extends EntityBase {
  Name: string;
  Surname: string;
  Patronymic: string;

  Username: string;

  Role: Roles;
  Gender: Gender = Gender.Unrecognized;

  PassportSerial: string;
  Address: string;

  SubsidiaryId: number;
  Subsidiary: Subsidiary;

  SuperiorId: number;
  Superior: Employee;
}
