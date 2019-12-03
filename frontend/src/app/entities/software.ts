import {EntityBase} from "./entity-base";
import {SoftwareType} from "./software-type";
import {Computer} from "./computer";

export class Software extends EntityBase{
  Computer: Computer;
  ComputerId: number;

  SoftwareType: SoftwareType;
  SoftwareTypeId: number;
}
