import {Component, OnInit} from '@angular/core';
import {ComputerService} from "../services/computer.service";
import {Computer, ComputerType} from "../entities/computer";
import {EditorBase} from "./editor-base";
import {ActivatedRoute} from "@angular/router";
import {Employee} from "../entities/employee";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/computers">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              компьютера {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Основная информация">
                  <div id="sg-editor-card-container">
                      <mat-card id="left-section">
                          <h2 class="mat-title">Общая информация</h2>
                          <mat-form-field>
                              <input matInput placeholder="Имя компьютера"
                                     [(ngModel)]="this.Entity.Name">
                          </mat-form-field>
                          <mat-form-field>
                              <input matInput placeholder="Инвентарный номер"
                                     [(ngModel)]="this.Entity.InventoryId">
                          </mat-form-field>
                          <sg-subsidiary-search hint="Филиал помещения"></sg-subsidiary-search>
                          <sg-room-search [(ngModel)]="Entity.Room" hint="Помещение" required></sg-room-search>
                          <sg-employee-search [(ngModel)]="Entity.Responsible" hint="Ответственное лицо">

                          </sg-employee-search>

                          <mat-form-field>
                              <mat-select [(ngModel)]="Entity.Type" placeholder="Категория">
                                  <mat-option *ngFor="let elem of types" [value]="elem">
                                      {{elem | computerType}}
                                  </mat-option>
                              </mat-select>
                          </mat-form-field>
                      </mat-card>
                      <mat-card id="right-section">
                          <h2 class="mat-title">Комментарий</h2>
                          <mat-form-field appearance="outline">
                              <mat-label>Комментарий</mat-label>
                              <textarea matInput cdkTextareaAutosize="false"
                                        placeholder="Комментарий"

                                        [(ngModel)]="this.Entity.Comment"></textarea>
                          </mat-form-field>
                      </mat-card>
                  </div>
              </mat-tab>
              <mat-tab label="Пользователи">
                  <mat-card id="sg-editor-card-container" class="sg-many-many-card">
                      <table mat-table [dataSource]="this.Entity.Users"
                             [class.sg-table-compact]="true" class="sg-table">
                          <ng-container matColumnDef="remove_button">
                              <th mat-header-cell *matHeaderCellDef></th>
                              <td mat-cell *matCellDef="let element">
                                  <button mat-icon-button (click)="removeUser(element)">
                                      <mat-icon>remove</mat-icon>
                                  </button>
                              </td>

                          </ng-container>
                          <ng-container matColumnDef="id">
                              <th mat-header-cell *matHeaderCellDef>№</th>
                              <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
                          </ng-container>

                          <!-- Name Column -->
                          <ng-container matColumnDef="name">
                              <th mat-header-cell *matHeaderCellDef>Имя</th>
                              <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
                          </ng-container>

                          <ng-container matColumnDef="surname">
                              <th mat-header-cell *matHeaderCellDef>Фамилия</th>
                              <td mat-cell *matCellDef="let element"> {{element.Surname}}
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="role">
                              <th mat-header-cell *matHeaderCellDef>Должность</th>
                              <td mat-cell *matCellDef="let element"> {{element.Role | role}}
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="info" stickyEnd>
                              <th mat-header-cell *matHeaderCellDef></th>
                              <td mat-cell *matCellDef="let element"
                                  class="sg-table-action-button-container">
                                  <button mat-icon-button
                                          (click)="showInfoCard(element)">
                                      <mat-icon class="sg-table-info-button">error_outline</mat-icon>
                                  </button>
                              </td>
                          </ng-container>

                          <tr mat-header-row *matHeaderRowDef="UserDisplayedColumns"></tr>
                          <tr mat-row *matRowDef="let row; columns: UserDisplayedColumns;"></tr>
                      </table>
                      <div class="sg-many-many-card-searchbar">
                          <sg-employee-search [(ngModel)]="addingUser"
                                              hint="Привязать пользователя"></sg-employee-search>
                          <button mat-icon-button (click)="addUser()">
                              <mat-icon>add</mat-icon>
                          </button>
                      </div>
                  </mat-card>
              </mat-tab>

              <mat-tab label="Комплектующие">

              </mat-tab>
              <mat-tab label="Программы и лицензии">

              </mat-tab>
          </mat-tab-group>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class ComputerEditorComponent extends EditorBase<Computer, ComputerService> {
  types = [
    ComputerType.PC,
    ComputerType.Server,
    ComputerType.Laptop,
    ComputerType.Tablet,
    ComputerType.NetBook,
    ComputerType.NetTop,
    ComputerType.SmartPhone,
    ComputerType.Other
  ];

  UserDisplayedColumns = ['remove_button', 'id',
    'name', 'surname', 'role', 'info'];
  addingUser: Employee;

  constructor(private service: ComputerService, route: ActivatedRoute, private snackBar: MatSnackBar, dialog: MatDialog) {
    super(service, route, dialog, new Computer());
  }

  addUser() {
    if (!this.addingUser) {
      this.snackBar.open("Не выбран работник для привязки");
      return;
    }
    if (this.Entity.Users.find(x => x.Id == this.addingUser.Id)) {
      this.snackBar.open("Работник уже является пользователем");
    } else {
      this.Entity.Users.push(this.addingUser);
      //Cause change detection to update table datasource
      this.Entity.Users = [...this.Entity.Users].sort(x => x.Id);
    }
  }

  removeUser(user: Employee) {
    const index = this.Entity.Users.findIndex(x => x.Id == user.Id);
    this.Entity.Users.splice(index, 1);
    this.Entity.Users = [...this.Entity.Users];
  }

  showInfoCard(element: any) {

  }
}
