import { Pipe, PipeTransform } from '@angular/core';
import {Roles} from "../entities/employee";

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = value as Roles;
    switch (val) {
      case Roles.Director:
        return "Директор";
      case Roles.BranchDirector:
        return "Директор филиала";
      case Roles.LeadAdmin:
        return "Главный администратор";
      case Roles.BranchAdmin:
        return "Администратор филиала";
      case Roles.Responsible:
        return "Ответственное лицо";
      case Roles.StoreKeeper:
        return "Кладовщик";
    }
    return "";
  }

}
