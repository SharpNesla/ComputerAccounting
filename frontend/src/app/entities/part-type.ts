import {EntityBase} from "./entity-base";
import {SoftwareType} from './software-type';

export enum PartCategory {
  CPU,
  GPU,
  RAM,
  SATADevice,
  PCIExtension,
  Motherboard,
  PowerSupply,
  Case,
  Mouse,
  KeyBoard,
  Monitor,
  Other
}

export class PartType extends EntityBase{
  Model : string;
  Cost : number;
  Category : PartCategory;
  Characteristics : string;

  Driver : SoftwareType;
}

export class PartTypeExtension extends PartType{
  DriverId : number;
}
