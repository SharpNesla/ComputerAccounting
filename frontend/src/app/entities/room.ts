import {EntityBase} from "../model/entities/entity-base";
import {Subsidiary} from "./subsidiary";

export class Room extends EntityBase {
  Number : string;
  SubsidiaryId : number;
  Subsidiary : Subsidiary;
}
