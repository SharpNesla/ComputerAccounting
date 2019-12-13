import {Component, forwardRef} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Software} from "../entities/software";
import {SoftwareService} from "../services/software.service";

@Component({
  selector: 'sg-software-type-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput [placeholder]="'Поиск ' + searchHint"
                         (keydown)="$event.stopPropagation()"
                         type="search"
                         [(ngModel)]="searchString">
              </mat-form-field>
              <mat-option [value]="null">Не задано</mat-option>
              <mat-option *ngFor="let entity of entities | async" [value]="entity">
                  {{entity.Id}} {{entity.Typename}} {{entity.Category}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SoftwareTypeSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class SoftwareTypeSearchComponent extends SingleSearchBase<SoftwareType> {
  constructor(service : SoftwareTypeService){
    super(service)
  }
}
