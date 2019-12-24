import {EntityBase} from "./entity-base";
import {PartType} from "./part-type";
import {Subsidiary, SubsidiaryExtension} from './subsidiary';
import {Computer, ComputerExtension} from './computer';

export enum PartState {
  InComputer,
  InStore,
  Broken
}

export class Part extends EntityBase{
  Computer: Computer;
  Subsidiary: Subsidiary;
  PartType: PartType;
  IsValid: boolean;
}

export class PartExtension extends Part {
  ComputerId: number;
  Computer: ComputerExtension;

  Subsidiary: SubsidiaryExtension;
  SubsidiaryId: number | null;

  PartTypeId: number;
  State : PartState = PartState.InStore;
}
