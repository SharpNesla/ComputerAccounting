import {EntityBase} from "./entity-base";

export enum SoftwareCategory {
  Program,
  Driver,
  OS,
  Other
}

export class SoftwareType extends EntityBase {
  Typename: string;
  Category: SoftwareCategory;
  SoftwareCount: number;

  Dependencies : SoftwareType[];
}
