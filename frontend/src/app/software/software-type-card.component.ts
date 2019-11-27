import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Software} from "./software";
import {SoftwareService} from "./software.service";
import {SoftwareType} from "./software-type";
import {SoftwareTypeService} from "./software-type.service";

@Component({
  selector: 'sg-part-type-card',
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
                  <h2 class="mat-title">Комментарий</h2>

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
