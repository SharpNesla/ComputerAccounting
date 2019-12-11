import {Subsidiary} from "../entities/subsidiary";

export interface CountableBySubsidiary {
  getCountBySubsidiary(subsidiary : Subsidiary, filterDefinition : object);
}
