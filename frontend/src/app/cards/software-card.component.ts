import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Software} from "../entities/software";
import {SoftwareService} from "../services/software.service";

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Компьютер №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>


              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>

              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareCardComponent extends CardBase<Software, SoftwareService> {

  constructor(
    public dialogRef: MatDialogRef<SoftwareCardComponent>,
    service: SoftwareService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


}
