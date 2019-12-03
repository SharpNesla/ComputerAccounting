import { Pipe, PipeTransform } from '@angular/core';
import {PartCategory} from "../entities/part-type";
import {SoftwareCategory} from "../entities/software-type";

@Pipe({
  name: 'softwareCategory'
})
export class SoftwareCategoryPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = value as SoftwareCategory;
    switch (val) {
      case SoftwareCategory.Driver:
        return "Драйвер";
      case SoftwareCategory.OS:
        return "Операционная система";
      case SoftwareCategory.Program:
        return "Программа";
      default:
        return "Прочее"
    }
  }

}
