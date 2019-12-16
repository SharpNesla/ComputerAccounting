import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {Room} from "../entities/room";
import {RoomService} from "../services/room.service";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {BehaviorSubject, interval, Observable} from "rxjs";
import {debounce, filter, map, mergeMap, throttle} from "rxjs/operators";
import {newLineWithIndentation} from "tslint/lib/utils";
import {Employee} from "../entities/employee";
import {SoftwareType} from "../entities/software-type";

@Component({
  selector: 'sg-room-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [disabled]="disabled" [(value)]="this.selectedEntity">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput placeholder="Поиск сущности"
                         [(ngModel)]="this.searchString"
                         (keydown)="$event.stopPropagation()"
                         type="search">
              </mat-form-field>
              <mat-option>Не задано</mat-option>
              <mat-option *ngFor="let entity of entities | async" [value]="entity">
                  {{entity.Id}} {{entity.Number}}
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
export class RoomSearchComponent extends SingleSearchBase<Room> {

  @Input() subsidiaryCriteria: SoftwareType;

  constructor(service: RoomService) {
    super(service)
  }

  public dataSource(searchString, filterDefinition: object): Observable<Room[]> {

    return super.dataSource(searchString, filterDefinition);
  }
}
