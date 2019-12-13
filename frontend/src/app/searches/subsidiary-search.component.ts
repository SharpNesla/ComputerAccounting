import {Component, forwardRef} from '@angular/core';
import {Subsidiary} from "../entities/subsidiary";
import {SubsidiaryService} from "../services/subsidiary.service";
import {SingleSearchBase} from "./single-search-base";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";

@Component({
  selector: 'sg-subsidiary-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput placeholder="Поиск сущности"
                         (keydown)="$event.stopPropagation()"
                         type="search"
                         [(ngModel)]="searchString">
              </mat-form-field>
              <mat-option [value]="null">Не задано</mat-option>
              <mat-option *ngFor="let entity of entities | async" [value]="entity">
                  {{entity.Id}} {{entity.Address}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SubsidiarySearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class SubsidiarySearchComponent extends SingleSearchBase<Subsidiary> {
  constructor(service : SubsidiaryService){
    super(service)
  }
}
