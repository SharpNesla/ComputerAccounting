import {SubsidiaryExtension} from "../entities/subsidiary";
export class CountBySubsidiaryResult{
  Count: number;
  Subsidiary: SubsidiaryExtension;
}
export interface CountableBySubsidiaries {
  getCountBySubsidiaries( filterDefinition : object) : CountBySubsidiaryResult[];
}
