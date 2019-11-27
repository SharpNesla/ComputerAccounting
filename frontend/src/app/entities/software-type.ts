import {EntityBase} from "./entity-base";

export enum Category{
  Driver,
  OS,
  Program
}

export class SoftwareType extends EntityBase{
  TypeName : string;
  Category : Category;
}
