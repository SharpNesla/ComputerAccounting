import {Component, forwardRef} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {SoftwareTypeExtension} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";
import {SoftwareExtension} from "../entities/software";
import {SoftwareService} from "../services/software.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {PartTypeExtension} from "../entities/part-type";
import {PartTypeService} from "../services/part-type.service";

@Component({
  selector: 'sg-software-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity">
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
                  {{entity.Id}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SoftwareSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class SoftwareSearchComponent extends SingleSearchBase<SoftwareExtension> {
  constructor(service : SoftwareService){
    super(service)
  }
}
