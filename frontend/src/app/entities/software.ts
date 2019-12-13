import {EntityBase} from "./entity-base";
import {SoftwareType} from "./software-type";
import {Computer} from "./computer";
import {License} from "./license";

export class Software extends EntityBase{
  Computer: Computer;
  ComputerId: number;

  License: License;
  LicenseId: number;

  SoftwareType: SoftwareType;
  SoftwareTypeId: number;
}
