import {EntityBase} from './entity-base';
import {SoftwareType} from './software-type';



export class License extends EntityBase{
  Eula: string;
  Cost: number;
  MaxApplyCount: number;

  PurchasedAt: Date | string = new Date();

  ValidityDays: number;
  ValidityMonth: number;
  ValidityYears: number;

  SoftwareType: SoftwareType;
}

export class LicenseExtension extends License {
  Expired: boolean;
  SoftwareTypeId: number;
  SoftwareCount: number;

  ExpiredAt: Date | string = new Date();
}
