import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Software} from "../entities/software";
import {SoftwareService} from "../services/software.service";
import {SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Тип ПО №{{(Entity | async)?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body">Название: {{(Entity | async)?.Typename}}</p>
                  <p class="mat-body">Категория: {{(Entity | async)?.Category | softwareCategory}}</p>

              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <sg-software-grid isCompact="true"></sg-software-grid>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareTypeCardComponent extends CardBase<SoftwareType, SoftwareTypeService> {

  constructor(
    public dialogRef: MatDialogRef<SoftwareTypeCardComponent>,
    service: SoftwareTypeService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    super(dialogRef, service, data);
  }


}
