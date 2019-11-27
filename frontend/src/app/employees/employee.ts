import {EntityBase} from "../model/entities/entity-base";

export enum Roles {
  Director,
  BranchDirector,
  LeadAdmin,
  BranchAdmin,
  Responsible,
  StoreKeeper
}
export class Employee extends EntityBase{
  Name : string;
  Surname : string;
  Patronymic : string;
  Role : Roles;
}
