import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee} from "../entities/employee";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'sg-computer-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Работник №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body">Имя: {{entity?.Name}}</p>
                  <p class="mat-body">Фамилия: {{entity?.Surname}}</p>
                  <p class="mat-body">Отчество: {{entity?.Patronymic}}</p>


                  <p class="mat-body">Должность: {{entity?.Role | role}}</p>

              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>

              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeCardComponent extends CardBase<Employee, EmployeeService> {

  constructor(
    public dialogRef: MatDialogRef<EmployeeCardComponent>,
    service: EmployeeService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


}
