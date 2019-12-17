import {Component, Inject} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {Computer} from "../entities/computer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComputerService} from "../services/computer.service";

@Component({
  selector: 'sg-computer-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Компьютер №{{(Entity | async)?.Id}}
          </header>
          <mat-tab-group color="accent" backgroundColor="primary"
                         animationDuration="0ms">
              <mat-tab label="Общая информация">
                  <div id="sg-editor-card-container">
                      <mat-card id="left-section">
                          <h2 class="mat-title">Общая информация</h2>
                          <p class="mat-body">Имя компьютера: {{(Entity | async)?.Name}}</p>
                          <p class="mat-body">Инвентарный номер: {{(Entity | async)?.InventoryId}}</p>
                          <p class="mat-body">Комментарий:<br> {{(Entity | async)?.Comment}}</p>
                      </mat-card>
                      <mat-card id="right-section">
                          <h2 class="mat-title">Комментарий</h2>

                      </mat-card>
                  </div>
              </mat-tab>
              <mat-tab label="Установленные комплектующие">
                  <mat-card class="sg-card-table">
                      <sg-part-grid isCompact="true"></sg-part-grid>
                  </mat-card>
              </mat-tab>
              <mat-tab label="Установленное ПО">
                  <mat-card class="sg-card-table">
                      <sg-software-grid isCompact="true"></sg-software-grid>
                  </mat-card>
              </mat-tab>
          </mat-tab-group>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class ComputerCardComponent extends CardBase<Computer, ComputerService> {

  constructor(
    public dialogRef: MatDialogRef<ComputerCardComponent>,
    service: ComputerService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    super(dialogRef, service, data);
  }


}
