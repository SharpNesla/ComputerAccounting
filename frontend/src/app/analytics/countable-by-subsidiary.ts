import {Subsidiary} from "../entities/subsidiary";
export class CountBySubsidiaryResult{
  Count: number;
  Subsidiary: Subsidiary;
}
export interface CountableBySubsidiaries {
  getCountBySubsidiaries( filterDefinition : object) : CountBySubsidiaryResult[];
}
