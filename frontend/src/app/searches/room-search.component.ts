import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {SingleSearchBase} from "./single-search-base";
import {Room} from "../entities/room";
import {RoomService} from "../services/room.service";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'sg-room-search',
  template: `
      <mat-form-field  class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [(value)]="this.selectedEntity">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput placeholder="Поиск сущности"
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
  styles: [`
      .sg-search {
          width: 100%;
      }

      button {
          margin-left: 8px;
          margin-right: 4px;
      }`]
})
export class RoomSearchComponent implements ControlValueAccessor {
  get selectedEntity(): Room {
    return this._selectedEntity;
  }
  set selectedEntity(value: Room) {
    this._selectedEntity = value;
    this.writeValue(value);
    this.onTouched();
  }
  constructor(private service: RoomService) {
  }

  entities: Observable<Room[]>;
  @Input('selected') private _selectedEntity: Room;
  @Input() hint: string;
  @Input() searchHint: string;
  @Input() filterDefinition: Room[];

  search() {
    this.entities =
      this.service.get(0, 10, null, null, null)
        .pipe(map(x => {
          if (this._selectedEntity != null) {
            x.unshift(this._selectedEntity);
          }
          return x;
        }));
  }

  ngOnInit(): void {
    this.search()
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this._selectedEntity = obj;
    this.onChange(obj);
  }
}
