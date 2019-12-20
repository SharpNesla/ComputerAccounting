import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Part} from "../entities/part";
import {PartService} from "../services/part.service";

@Component({
  selector: 'sg-license-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">memory</mat-icon>
              Комплектующее №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комплектующие данного типа</h2>

              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class PartCardComponent extends CardBase<Part, PartService> {

  constructor(
    public dialogRef: MatDialogRef<PartCardComponent>, service: PartService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


}
