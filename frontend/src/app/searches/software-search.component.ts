import {Component} from '@angular/core';
import {SingleSearchBase} from "../utils/single-search-base";
import {SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";
import {Software} from "../entities/software";
import {SoftwareService} from "../services/software.service";

@Component({
  selector: 'sg-software-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [value]="selectedEntity" (valueChange)="selectedEntityChanged.emit($event)">
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
                  {{entity.Id}}
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
export class SoftwareSearchComponent extends SingleSearchBase<Software, SoftwareService> {
  constructor(service : SoftwareTypeService){
    super(service);
  }
}
