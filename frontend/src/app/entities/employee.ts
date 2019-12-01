import {EntityBase} from "./entity-base";

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

export class Employee extends EntityBase{
  Name : string;
  Surname : string;
  Patronymic : string;
  Role : Roles;
  Gender : Gender;
  PassportSerial : string;
  Address : string;
}
