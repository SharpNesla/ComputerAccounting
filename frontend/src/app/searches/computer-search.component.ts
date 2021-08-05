import {Component, forwardRef, Input} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {ComputerExtension} from "../entities/computer";
import {ComputerService} from "../services/computer.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {SoftwareTypeExtension} from '../entities/software-type';
import {LicenseSearchMode} from './license-search.component';
import {Observable, of} from 'rxjs';
import {LicenseExtension} from '../entities/license';

export declare type ComputerSearchMode = 'normal' | 'satisfying' | undefined;

@Component({
  selector: 'sg-computer-search',
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
                  {{entity?.Id}} {{entity?.Name}} {{entity?.InventoryId}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ComputerSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class ComputerSearchComponent extends SingleSearchBase<ComputerExtension> {
  @Input() mode : ComputerSearchMode;
  @Input() dependentType : SoftwareTypeExtension;

  constructor(private computerService : ComputerService){
    super(computerService)
  }

  public dataSource(searchString, filterDefinition: object): Observable<ComputerExtension[]> {
    switch (this.mode) {
      case "satisfying":
        if (this.dependentType){
          return this.computerService.getDependencySatisfying(searchString, 0,10, this.dependentType);
        }
        return of([]);
      case "normal":
      default:
        return super.dataSource(searchString, filterDefinition);
    }
  }
}
