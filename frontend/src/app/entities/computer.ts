import {EntityBase} from "./entity-base";
import {Room} from "./room";
import {Employee} from "./employee";

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

export class Computer extends EntityBase{
  InventoryId : string;
  Name : string;

  Type : ComputerType;

  Subsidiary : Room;
  SubsidiaryId : number | null;

  Room : Room;
  RoomId : number | null;

  Responsible : Employee;
  ResponsibleId : number;

  Users : Employee[] = [];
  UsersCount: number;
}
