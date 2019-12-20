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

  PurchasedAt : Date | string = new Date();
  ExpiredAt: Date | string = new Date();

  Expired : boolean;

  SoftwareTypeId : number;
  SoftwareType : SoftwareType;

  SoftwareCount : number;
}
