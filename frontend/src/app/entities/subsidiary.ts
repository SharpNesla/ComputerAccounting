import {EntityBase} from "./entity-base";
import {Employee} from "./employee";
import {Room} from './room';

export class Subsidiary extends EntityBase {
  Name : string;
  Address : string;
  RoomsCount : number;
  Rooms : Room[];
  EmployeesCount : number;
  ComputersCount : number;

  Director : Employee;
  DirectorId : number | null;
}
