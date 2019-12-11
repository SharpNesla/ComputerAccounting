import {EntityBase} from "./entity-base";
import {PartType} from "./part-type";
import {Subsidiary} from "./subsidiary";
import {Computer} from "./computer";

export enum PartState {
  InComputer,
  InStore,
  Broken
}

export class Part extends EntityBase {
  Computer: Computer;
  ComputerId: number;

  Subsidiary: Subsidiary;
  SubsidiaryId: number | null;

  PartType: PartType;
  PartTypeId: number;

  State : PartState = PartState.InStore;
}
