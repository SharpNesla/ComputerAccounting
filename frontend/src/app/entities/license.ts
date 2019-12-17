import {EntityBase} from "./entity-base";
import {SoftwareType} from "./software-type";
export enum LicenseStatus{
  OverTimed,
  Available,
  PartialApplied,
  FullApplied,

}
export class License extends EntityBase {
  Eula : string;
  Cost: number;
  MaxApplyCount: number;

  PurchaseDate : Date | string = new Date();
  ExpirationDate: Date | string = new Date();

  LicenseStatus;

  SoftwareTypeId : number;
  SoftwareType : SoftwareType;

  SoftwareCount : number;
}
