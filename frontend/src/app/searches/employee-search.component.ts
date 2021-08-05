import {Component, forwardRef} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {EmployeeExtension} from "../entities/employee";
import {EmployeeService} from "../services/employee.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable, of} from 'rxjs';
import {LicenseExtension} from '../entities/license';

@Component({
  selector: 'sg-employee-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity" [required]="required">
              <button (click)="search()" mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput [placeholder]="'Поиск ' + searchHint"
                         (keydown)="$event.stopPropagation()"
                         (keydown.enter)="search()"
                         type="search"
                         [(ngModel)]="searchString">
              </mat-form-field>
              <mat-option [value]="null">Не задано</mat-option>
              <mat-option *ngFor="let entity of entities" [value]="entity">
                  {{entity?.Id}} {{entity?.Name}} {{entity?.Surname}} {{entity?.Role | role}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => EmployeeSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class EmployeeSearchComponent extends SingleSearchBase<EmployeeExtension> {
  constructor(service : EmployeeService){
    super(service)
  }


}
