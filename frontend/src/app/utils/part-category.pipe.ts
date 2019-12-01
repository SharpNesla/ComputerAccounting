import { Pipe, PipeTransform } from '@angular/core';
import {PartCategory} from "../entities/part-type";

@Pipe({
  name: 'partCategory'
})
export class PartCategoryPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = value as PartCategory;
    switch (val) {
      case PartCategory.CPU:
        return "Центральный процессов";
      case PartCategory.GPU:
        return "Видеокарта";
      case PartCategory.RAM:
        return "Оперативная память";
      case PartCategory.SATADevice:
        return "SATA устройство";
      case PartCategory.PCIExtension:
        return "PCI/PCI-E плата расширения";
      case PartCategory.Motherboard:
        return "Материнская плата";
      case PartCategory.PowerSupply:
        return "Блок питания";
      case PartCategory.Case:
        return "Корпус";
      case PartCategory.Mouse:
        return "Мышь";
      case PartCategory.KeyBoard:
        return "Клавиатура";
      case PartCategory.Monitor:
        return "Монитор";
      case PartCategory.Other:
        return "Прочее";
    }
  }

}
