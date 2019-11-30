import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PartType} from "../entities/part-type";
import {PartTypeService} from "../services/part-type.service";

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (Accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Тип комплектующего №{{(Entity | async)?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p>Модель: {{(Entity | async)?.Model}}</p>
                  <p>Стоимость: {{(Entity | async)?.Cost}}₽</p>
                  <p>Характеристики: {{(Entity | async)?.Characteristics}}</p>

                  <p>Комментарий: {{(Entity | async)?.Comment}}</p>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <sg-part-grid isCompact="true"></sg-part-grid>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class PartTypeCardComponent extends CardBase<PartType, PartTypeService> {

  constructor(
    public dialogRef: MatDialogRef<PartTypeCardComponent>,
    service: PartTypeService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    super(dialogRef, service, data);
  }


}
