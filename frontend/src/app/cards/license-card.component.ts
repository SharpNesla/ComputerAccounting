import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {License} from "../entities/license";
import {LicenseService} from "../services/license.service";

@Component({
  selector: 'sg-license-card',
  template: `
      <sg-dialog-layout (Accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Лицензии №{{(Entity | async)?.Id}}
          </header>
              <div id="sg-editor-card-container">
                  <mat-card id="left-section">
                      <h2 class="mat-title">Общая информация</h2>

                      <p>Стоимость: {{(Entity | async)?.Cost}}₽</p>
                      <p>Максимальное число применений: {{(Entity | async)?.MaxApplyCount}}</p>
                      
                  </mat-card>
                  <mat-card id="right-section">
                      <h2 class="mat-title">Комментарии</h2>
                  </mat-card>
              </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class LicenseCardComponent extends CardBase<License, LicenseService> {

  constructor(
    public dialogRef: MatDialogRef<LicenseCardComponent>,
    service: LicenseService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    super(dialogRef, service, data);
  }


}
