import {Component} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {Computer} from "../entities/computer";
import {ComputerService} from "../services/computer.service";
import {Employee} from "../entities/employee";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'sg-employee-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [value]="selectedEntity" (valueChange)="selectedEntityChanged.emit($event)">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput [placeholder]="'Поиск ' + searchHint"
                         (keydown)="$event.stopPropagation(); "
                         type="search">
              </mat-form-field>
              <mat-option [value]="null">Не задано</mat-option>
              <mat-option *ngFor="let entity of entities | async" [value]="entity">
                  {{entity.Id}} {{entity.Name}} {{entity.Surname}} {{entity.Role | role}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  styles: [`
      .sg-search {
          width: 100%;
      }

      button {
          margin-left: 8px;
          margin-right: 4px;
      }`]
})
export class EmployeeSearchComponent extends SingleSearchBase<Employee, EmployeeService> {
  constructor(service : EmployeeService){
    super(service);
  }
}
