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
              <mat-icon id="sg-editor-icon">storefront</mat-icon>
              Помещение №{{entity?.Id}}
          </header>
        <div id="sg-editor-card-container">
          <mat-card id="left-section">
            <h2 class="mat-title">Общая информация</h2>
            <p class="mat-body">Номер: {{entity?.Number}}</p>
            <p class="mat-body">Филиал:
              №{{entity?.Subsidiary.Id}}
              "{{entity?.Subsidiary.Name}}"
              {{entity?.Subsidiary.Address}}
            </p>
            <p class="mat-body">
              Комментарий:
            </p>
            <p class="sg-card-comment-box">
              {{entity?.Comment}}
            </p>
          </mat-card>
          <mat-card id="right-section">
            <sg-computer-grid isCompact="true" [customDataSource]="computers"></sg-computer-grid>
          </mat-card>
        </div>
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
