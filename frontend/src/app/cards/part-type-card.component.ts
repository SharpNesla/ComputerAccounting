import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PartType} from "../entities/part-type";
import {PartTypeService} from "../services/part-type.service";

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Тип комплектующего №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p>Модель: {{entity?.Model}}</p>
                  <p>Стоимость: {{entity?.Cost}}₽</p>
                  <p>Характеристики: {{entity?.Characteristics}}</p>

                  <p>Комментарий: {{entity?.Comment}}</p>
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
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


}
