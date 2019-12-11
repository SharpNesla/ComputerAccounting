import { Pipe, PipeTransform } from '@angular/core';
import {PartState} from "../entities/part";

@Pipe({
  name: 'partState'
})
export class PartStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = value as PartState;
    switch (val) {
      case PartState.InComputer:
        return "Установлено";
      case PartState.InStore:
        return "На складе";
      case PartState.Broken:
        return "Вышло из строя";
    }
    return "";
  }

}
