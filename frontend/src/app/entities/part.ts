import {EntityBase} from './entity-base';
import {PartType} from './part-type';
import {Subsidiary, SubsidiaryExtension} from './subsidiary';
import {Computer, ComputerExtension} from './computer';
import {SoftwareType} from './software-type';

export enum PartState {
  InComputer,
  InStore,
  Broken
}

export class Part extends EntityBase {
  Computer: Computer;
  Subsidiary: Subsidiary;
  PartType: PartType;
  Driver: SoftwareType;
  IsValid: boolean;
}

export class PartExtension extends Part {
  ComputerId: number;
  Computer: ComputerExtension;

  Subsidiary: SubsidiaryExtension;
  SubsidiaryId: number | null;

  PartTypeId: number;
  DriverId: number;
}
