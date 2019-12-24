import {Component, forwardRef, Input} from '@angular/core';
import {SubsidiaryExtension} from "../entities/subsidiary";
import {SubsidiaryService} from "../services/subsidiary.service";
import {SingleSearchBase} from "./single-search-base";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {SoftwareTypeExtension} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";
import {LicenseExtension} from "../entities/license";
import {LicenseService} from "../services/license.service";
import {Observable} from "rxjs";

export declare type LicenseSearchMode = 'normal' | 'applicable' | undefined;

@Component({
  selector: 'sg-license-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity">
              <button (click)="search()" mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput placeholder="Поиск сущности"
                         (keydown)="$event.stopPropagation()"
                         (keydown.enter)="search()"
                         type="search"
                         [(ngModel)]="searchString">
              </mat-form-field>
              <mat-option [value]="null">Не задано</mat-option>
              <mat-option *ngFor="let entity of entities" [value]="entity">
                  {{entity?.Id}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => LicenseSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class LicenseSearchComponent extends SingleSearchBase<LicenseExtension> {
  @Input() mode : LicenseSearchMode;
  @Input() applicableType : SoftwareTypeExtension;

  constructor(private licenseService : LicenseService){
    super(licenseService)
  }

  public dataSource(searchString, filterDefinition: object): Observable<LicenseExtension[]> {
    switch (this.mode) {
      case "applicable":
        if (this.applicableType){
          return this.licenseService.getApplicable(searchString, 0,10, this.applicableType);
        }
        return new Observable(x=>x.next([]));
      case "normal":
      default:
        return super.dataSource(searchString, filterDefinition);
    }
  }

}
