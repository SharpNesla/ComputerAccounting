import {EntityBase} from "./entity-base";
import {SoftwareType} from "./software-type";

export class License extends EntityBase {
  Eula : string;
  Cost: number;
  MaxApplyCount: number;
  IsEndsOnDate;

  PurchaseDate;
  ExpirationDate;

  ApplySoftwareTypeId : number;
  ApplySoftwareType : SoftwareType;

}
