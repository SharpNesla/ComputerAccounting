import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Room} from "./room";
import {RoomService} from "./room.service";

@Component({
  selector: 'sg-room-card',
  template: `
      <sg-dialog-layout (Accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Компьютер №{{(Entity | async)?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>


              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Компьютеры</h2>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class RoomCardComponent extends CardBase<Room, RoomService> {

  constructor(
    public dialogRef: MatDialogRef<RoomCardComponent>,
    service: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    super(dialogRef, service, data);
  }


}
