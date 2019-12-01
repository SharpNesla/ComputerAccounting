import {EntityBase} from "./entity-base";
import {Employee} from "./employee";

export class Subsidiary extends EntityBase {
  Name : string;
  Address : string;
  RoomsCount : number;

  Director : Employee;
  DirectorId : number | null;
}
