import {Pipe, PipeTransform} from '@angular/core';
import {ComputerType} from "../entities/computer";

@Pipe({
  name: 'computerType'
})
export class ComputerTypePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = value as ComputerType;
    switch (val) {
      case ComputerType.PC:
        return "ПК";
      case ComputerType.Server:
        return "Сервер";
      case ComputerType.Laptop:
        return "Ноутбук";
      case ComputerType.Tablet:
        return "Планшет";
      case ComputerType.NetBook:
        return "Нетбук";
      case ComputerType.SmartPhone:
        return "Смартфон";
      case ComputerType.NetTop:
        return "Неттоп";
      default:
        return "Не определён";
    }
  }

}
