import {EntityBase} from "./entity-base";
import {Part} from "./part";

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
}
