import {Component, forwardRef, Input} from '@angular/core';
import {SingleSearchBase} from './single-search-base';
import {RoomExtension} from '../entities/room';
import {RoomService} from '../services/room.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {SoftwareTypeExtension} from '../entities/software-type';

@Component({
  selector: 'sg-room-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity" [required]="required">
              <button (click)="search()" mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput placeholder="Поиск сущности"
                         [(ngModel)]="this.searchString"
                         (keydown)="$event.stopPropagation()"
                         (keydown.enter)="search()"
                         type="search">
              </mat-form-field>
              <mat-option>Не задано</mat-option>
              <mat-option *ngFor="let entity of entities" [value]="entity">
                  {{entity?.Id}} {{entity?.Number}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RoomSearchComponent)
  }],
  styleUrls: ['./search-styles.scss']
})
export class RoomSearchComponent extends SingleSearchBase<RoomExtension> {

  @Input() subsidiaryCriteria: SoftwareTypeExtension;

  constructor(service: RoomService) {
    super(service);
  }

  public dataSource(searchString, filterDefinition: object): Observable<RoomExtension[]> {
    return super.dataSource(searchString, filterDefinition);
  }
}
