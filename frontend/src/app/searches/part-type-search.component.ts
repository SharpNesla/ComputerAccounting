import {Component, forwardRef} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {PartTypeExtension} from "../entities/part-type";
import {PartTypeService} from "../services/part-type.service";
import {RoomService} from "../services/room.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'sg-part-type-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity" required>
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
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PartTypeSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class PartTypeSearchComponent extends SingleSearchBase<PartTypeExtension> {
  constructor(service : PartTypeService){
    super(service)
  }
}
