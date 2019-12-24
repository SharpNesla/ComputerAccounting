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
                  {{entity.Id}} {{entity.Model}} {{entity.Category | partCategory}}
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
