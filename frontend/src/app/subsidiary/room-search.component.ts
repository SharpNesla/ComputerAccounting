import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Subsidiary} from "./subsidiary";
import {SubsidiaryService} from "./subsidiary.service";
import {map} from "rxjs/operators";
import {SingleSearchBase} from "../utils/single-search-base";
import {Room} from "./room";
import {RoomService} from "./room.service";

@Component({
  selector: 'sg-room-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>{{hint}}</mat-label>
          <mat-select [value]="selectedEntity" (valueChange)="selectedEntityChanged.emit($event)">
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
                  {{entity.Id}} {{entity.Number}}
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
export class RoomSearchComponent extends SingleSearchBase<Room, RoomService> {
  constructor(service : RoomService){
    super(service);
  }
}
