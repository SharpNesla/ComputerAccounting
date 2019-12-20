import {Component, Inject} from '@angular/core';
import {CardBase} from './card-base';
import {Computer} from '../entities/computer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComputerService} from '../services/computer.service';
import {Employee} from '../entities/employee';
import {CardService} from './card.service';
import {EmployeeCardComponent} from './employee-card.component';
import {Room} from '../entities/room';
import {Subsidiary} from '../entities/subsidiary';
import {RoomCardComponent} from './room-card.component';
import {SubsidiaryCardComponent} from './subsidiary-card.component';

@Component({
  selector: 'sg-computer-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Компьютер №{{entity?.Id}}
          </header>
          <mat-tab-group color="accent" backgroundColor="primary"
                         animationDuration="0ms">
              <mat-tab label="Общая информация">
                  <div id="sg-editor-card-container">
                      <mat-card id="left-section">
                          <h2 class="mat-title">Общая информация</h2>
                          <p class="mat-body">Имя компьютера: {{entity?.Name}}</p>
                          <p class="mat-body">Инвентарный номер: {{entity?.InventoryId}}</p>

                          <p class="mat-body" *ngIf="entity?.Subsidiary">
                              <a (click)="showSubsidiaryCard(entity?.Subsidiary)">Филиал:
                                  <br>
                                  №{{entity?.Subsidiary.Id}}
                                  "{{entity.Subsidiary.Name}}"
                                  {{entity?.Subsidiary.Address}}
                              </a>
                          </p>

                          <p class="mat-body" *ngIf="entity?.Room">
                              <a (click)="showRoomCard(entity?.Room)">Помещение:
                                  <br>
                                  №{{entity?.Room.Id}}
                                  {{entity.Room.Number}}
                              </a>
                          </p>
                          
                          <p class="mat-body" *ngIf="entity?.Responsible">
                              <a (click)="showEmployeeCard(entity?.Responsible)">Ответственное лицо:
                                  <br>
                                  №{{entity?.Responsible.Id}}
                                  {{entity?.Responsible.Name}}
                                  {{entity?.Responsible.Surname}}
                              </a>
                          </p>

                          <p class="mat-body">Комментарий:<br> {{entity?.Comment}}</p>
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
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


  showEmployeeCard(employee: Employee) {
    this.cardService.showInfoCard(employee, EmployeeCardComponent);
  }

  showRoomCard(room: Room) {
    this.cardService.showInfoCard(room, RoomCardComponent);
  }

  showSubsidiaryCard(subsidiary: Subsidiary) {

    this.cardService.showInfoCard(subsidiary, SubsidiaryCardComponent);
  }
}
