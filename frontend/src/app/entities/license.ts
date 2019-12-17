import {EntityBase} from "./entity-base";
import {SoftwareType} from "./software-type";

export class License extends EntityBase {
  Eula : string;
  Cost: number;
  MaxApplyCount: number;
  IsEndsOnDate : boolean;

  PurchaseDate;
  ExpirationDate;

  SoftwareTypeId : number;
  SoftwareType : SoftwareType;

  SoftwareCount : number;
}
