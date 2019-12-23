import {EntityBase} from './entity-base';
import {RoomExtension} from './room';
import {Employee, EmployeeExtension} from './employee';
import {SubsidiaryExtension} from './subsidiary';

export enum ComputerType {
  PC,
  Server,
  Laptop,
  Tablet,
  NetBook,
  NetTop,
  SmartPhone,
  Other
}

export class Computer extends EntityBase {
  InventoryId: string;
  Name: string;

  Type: ComputerType;
  Responsible: Employee;
}

export class ComputerExtension extends Computer {
  Subsidiary: SubsidiaryExtension;
  SubsidiaryId: number | null;

  Room: RoomExtension;
  RoomId: number | null;

  ResponsibleId: number;

  Users: EmployeeExtension[] = [];
  UsersCount: number;
}
