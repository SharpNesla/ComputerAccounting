import {EntityBase} from "./entity-base";
import {LicenseExtension} from "./license";
import {SoftwareExtension} from "./software";

export enum SoftwareCategory {
  Program,
  Driver,
  OS,
  Other
}

export class SoftwareType extends EntityBase{
  Typename: string;
  Category: SoftwareCategory;
}

export class SoftwareTypeExtension extends SoftwareType {
  SoftwareCount: number;
  Dependencies: SoftwareTypeExtension[] = [];
  Software: SoftwareExtension[] = [];
}
