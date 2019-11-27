import {EntityBase} from "../model/entities/entity-base";

export enum Category{
  Driver,
  OS,
  Program
}

export class SoftwareType extends EntityBase{
  TypeName : string;
  Category : Category;
}
