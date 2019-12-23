import {EntityBase} from './entity-base';
import {SoftwareType} from './software-type';

export enum LicenseStatus {
  OverTimed,
  Available,
  PartialApplied,
  FullApplied,
}

export class License {
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
