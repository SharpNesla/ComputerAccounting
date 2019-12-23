import {EntityBase} from "./entity-base";
import {PartType} from "./part-type";
import {Subsidiary} from "./subsidiary";
import {Computer} from "./computer";

export enum PartState {
  InComputer,
  InStore,
  Broken
}

export class Part extends EntityBase{
  Computer: Computer;
  Subsidiary: Subsidiary;
  PartType: PartType;
}

export class PartExtension extends Part {
  ComputerId: number;
  SubsidiaryId: number | null;
  PartTypeId: number;
  State : PartState = PartState.InStore;
}
