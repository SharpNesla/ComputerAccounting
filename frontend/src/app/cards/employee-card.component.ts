import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from './card-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeExtension} from '../entities/employee';
import {EmployeeService} from '../services/employee.service';
import {CardService} from './card.service';
import {SubsidiaryExtension} from '../entities/subsidiary';
import {SubsidiaryCardComponent} from './subsidiary-card.component';

@Component({
  selector: 'sg-computer-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">account_circle</mat-icon>
              Работник №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body">Имя: {{entity?.Name}}</p>
                  <p class="mat-body">Фамилия: {{entity?.Surname}}</p>
                  <p class="mat-body">Отчество: {{entity?.Patronymic}}</p>


                  <p class="mat-body">Пол: {{entity?.Gender | gender}}</p>

                  <p class="mat-body">Адрес: {{entity?.Address}}</p>

                  <p class="mat-body">Серия и номер паспорта: {{entity?.PassportSerial}}</p>

                  <p class="mat-body">Должность: {{entity?.Role | role}}</p>

                  <p class="mat-body" *ngIf="entity?.Superior">
                      <a (click)="showEmployeeCard(entity?.Superior)">Непосредственный руководитель:
                          <br>
                          №{{entity?.Superior.Id}}
                          {{entity?.Superior.Name}}
                          {{entity?.Superior.Surname}}
                      </a>
                  </p>

                  <p class="mat-body" *ngIf="entity?.Subsidiary">
                      <a (click)="showSubsidiaryCard(entity?.Subsidiary)">Филиал:
                          <br>
                          №{{entity?.Subsidiary.Id}}
                          "{{entity.Subsidiary.Name}}"
                          {{entity?.Subsidiary.Address}}
                      </a>
                  </p>
                  <p class="mat-body" *ngIf="!entity?.Subsidiary">Филиал: не задан</p>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <p class="mat-body">
                      Комментарий:
                  </p>
                  <p class="sg-card-comment-box">
                      {{entity?.Comment}}
                  </p>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeCardComponent extends CardBase<EmployeeExtension, EmployeeService> {

  constructor(
    public dialogRef: MatDialogRef<EmployeeCardComponent>,
    service: EmployeeService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }

  showEmployeeCard(employee: EmployeeExtension) {
    this.cardService.showInfoCard(employee, EmployeeCardComponent);
  }
  showSubsidiaryCard(subsidiary: SubsidiaryExtension) {
    this.cardService.showInfoCard(subsidiary, SubsidiaryCardComponent);
  }
}
