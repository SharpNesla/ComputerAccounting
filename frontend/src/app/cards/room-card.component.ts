import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from './card-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomExtension} from '../entities/room';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'sg-room-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Помещение №{{entity?.Id}}
          </header>
          <mat-tab-group color="accent" backgroundColor="primary"
                         animationDuration="0ms">

              <mat-tab label="Общая информация">
                  <div id="sg-editor-card-container">
                      <mat-card class="sg-card-table">
                          <h2 class="mat-title">Общая информация</h2>
                          <p class="mat-body">Номер: {{entity?.Number}}</p>
                          <p class="mat-body">Филиал:
                              №{{entity?.Subsidiary.Id}}
                              "{{entity?.Subsidiary.Name}}"
                              {{entity?.Subsidiary.Address}}
                          </p>
                      </mat-card>
                  </div>
              </mat-tab>

              <mat-tab label="Общая информация">
                  <div id="sg-editor-card-container" >
                      <mat-card class="sg-card-table">
                          <h2 class="mat-title">Компьютеры</h2>
                          <sg-computer-grid isCompact="true" [customDataSource]="computers"></sg-computer-grid>
                      </mat-card>

                  </div>
              </mat-tab>
          </mat-tab-group>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class RoomCardComponent extends CardBase<RoomExtension, RoomService> {

  constructor(
    public dialogRef: MatDialogRef<RoomCardComponent>,
    service: RoomService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }

  get computers() {
    if (this.entity && this.entity.Computers) {
      return this.entity.Computers;
    }
    return [];
  }

}
