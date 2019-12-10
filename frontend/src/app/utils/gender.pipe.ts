import { Pipe, PipeTransform } from '@angular/core';
import {Gender, Roles} from "../entities/employee";

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = value as Gender;
    switch (val) {
      case Gender.Male:
        return "Мужской";
      case Gender.Female:
        return "Женский";
      case Gender.Unrecognized:
        return "Не определён";

    }
    return "";
  }

}
