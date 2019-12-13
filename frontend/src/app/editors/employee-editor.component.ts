import {Component} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Employee, Gender, Roles} from "../entities/employee";
import {EditorBase} from "./editor-base";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-employee-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/employees">
          <header>
              <mat-icon id="sg-editor-icon">account_circle</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              работника {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>

                  <sg-employee-search hint="Непосредственный руководитель"
                                      [(ngModel)]="Entity.Superior"></sg-employee-search>
                  <sg-subsidiary-search hint="Филиал"
                                        [(ngModel)]="Entity.Subsidiary"></sg-subsidiary-search>

                  <mat-form-field>
                      <input matInput placeholder="Имя"
                             [(ngModel)]="this.Entity.Name">
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Фамилия"
                             [(ngModel)]="this.Entity.Surname">
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Отчество"
                             [(ngModel)]="this.Entity.Patronymic">
                  </mat-form-field>

                  <label>Пол:</label>
                  <mat-radio-group
                          class="sg-vertical-radio-group"
                          aria-label="Выберите пол" [(ngModel)]="this.Entity.Gender">
                      <mat-radio-button
                              class="sg-vertical-radio-button"
                              *ngFor="let gender of genders" [value]="gender">
                          {{gender | gender}}
                      </mat-radio-button>
                  </mat-radio-group>

                  <mat-form-field>
                      <input matInput placeholder="Серия и номер паспорта"
                             [(ngModel)]="this.Entity.PassportSerial">
                  </mat-form-field>

                  <mat-form-field>
                      <input matInput placeholder="Адрес"
                             [(ngModel)]="this.Entity.Address">
                  </mat-form-field>
              </mat-card>

              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field>
                      <mat-select placeholder="Должность"
                                  [(ngModel)]="Entity.Role">
                          <mat-option *ngFor="let role of roles" [value]="role.value">
                              {{role.value | role}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>

                  <mat-form-field>
                      <input matInput placeholder="Имя пользователя"
                             [(ngModel)]="this.Entity.Username">
                  </mat-form-field>

                  <mat-checkbox *ngIf="!isNew" [(ngModel)]="this.isPasswordChange">Сменить пароль</mat-checkbox>

                  <mat-form-field>
                      <input matInput placeholder="Пароль" [disabled]="!(this.isPasswordChange || isNew)"
                             [(ngModel)]="this.password" type="password">
                  </mat-form-field>

                  <mat-form-field>
                      <input matInput placeholder="Пароль (повтор)" [disabled]="!(this.isPasswordChange || isNew)"
                             [(ngModel)]="this.passwordRepeat" type="password">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeEditorComponent extends EditorBase<Employee, EmployeeService> {
  genders = [
    Gender.Male,
    Gender.Female,
    Gender.Unrecognized
  ];

  roles = [
    {value: Roles.Director},
    {value: Roles.BranchDirector},
    {value: Roles.LeadAdmin},
    {value: Roles.BranchAdmin},
    {value: Roles.Responsible},
    {value: Roles.StoreKeeper},
  ];

  isPasswordChange: boolean;
  password: string;
  passwordRepeat: string;

  constructor(private service: EmployeeService, route: ActivatedRoute, dialog: MatDialog) {
    super(service, route, dialog, new Employee());
  }

  public applyChanges() {
    if ((this.isPasswordChange || this.isNew) && this.password == this.passwordRepeat) {
      this.Entity['Password'] = this.password;
      this.Entity['PasswordRepeat'] = this.passwordRepeat;
    }
    super.applyChanges();
  }
}
