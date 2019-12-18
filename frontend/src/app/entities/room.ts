import {EntityBase} from "./entity-base";
import {Subsidiary} from "./subsidiary";
import {Computer} from './computer';

export class Room extends EntityBase {
  Number : string;
  SubsidiaryId : number;
  Subsidiary : Subsidiary;

  Computers : Computer[];
  ComputersCount : number;
}
