import {EntityBase} from './entity-base';
import {SoftwareTypeExtension} from './software-type';
import {ComputerExtension} from './computer';
import {LicenseExtension} from './license';

export class Software extends EntityBase {
  Computer: ComputerExtension;
  License: LicenseExtension;
  SoftwareType: SoftwareTypeExtension;
}

export class SoftwareExtension extends Software {
  ComputerId: number;
  LicenseId: number;
  SoftwareTypeId: number;
}
