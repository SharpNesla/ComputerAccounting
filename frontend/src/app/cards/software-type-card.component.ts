import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SoftwareTypeExtension} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Тип ПО №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body">Название: {{entity?.Typename}}</p>
                  <p class="mat-body">Категория: {{entity?.Category | softwareCategory}}</p>
                  <p class="mat-body">
                      Комментарий:
                  </p>
                  <p class="sg-card-comment-box">
                      {{entity?.Comment}}
                  </p>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">ПО данного типа</h2>
                  <sg-software-grid isCompact="true"></sg-software-grid>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareTypeCardComponent extends CardBase<SoftwareTypeExtension, SoftwareTypeService> {

  constructor(
    public dialogRef: MatDialogRef<SoftwareTypeCardComponent>,
    service: SoftwareTypeService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


}
