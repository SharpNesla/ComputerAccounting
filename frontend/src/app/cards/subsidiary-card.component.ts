import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from './card-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SubsidiaryExtension} from '../entities/subsidiary';
import {SubsidiaryService} from '../services/subsidiary.service';
import {EmployeeExtension} from '../entities/employee';
import {CardService} from './card.service';
import {EmployeeCardComponent} from './employee-card.component';

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Филиал №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body">Название: {{entity?.Name}}</p>
                  <p class="mat-body">Адрес: {{entity?.Address}}</p>

                  <p class="mat-body" *ngIf="entity?.Director">
                      <a (click)="showEmployeeCard(entity?.Director)">Непосредственный руководитель:
                          <br>
                          №{{entity?.Director.Id}}
                          {{entity?.Director.Name}}
                          {{entity?.Director.Surname}}
                      </a>
                  </p>

                  <p class="mat-body">Количество помещений: {{entity?.RoomsCount}}</p>
                  <!--                  <p class="mat-body">Количество компьютеров: {{entity?.ComputersCount}}</p>-->
                  <p class="mat-body">Количество сотрудников: {{entity?.EmployeesCount}}</p>

                  <p class="mat-body">
                      Комментарий:
                  </p>
                  <p class="sg-card-comment-box">
                      {{entity?.Comment}}
                  </p>

              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Помещения</h2>
                  <sg-room-grid [customDataSource]="rooms"
                                isCompact="true"></sg-room-grid>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class SubsidiaryCardComponent extends CardBase<SubsidiaryExtension, SubsidiaryService> {

  constructor(
    public dialogRef: MatDialogRef<SubsidiaryCardComponent>,
    service: SubsidiaryService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


  get rooms() {
    if (this.entity && this.entity.Rooms) {
      return this.entity.Rooms;
    }
    return [];
  }

  showEmployeeCard(employee: EmployeeExtension) {
    this.cardService.showInfoCard(employee, EmployeeCardComponent);
  }

}
