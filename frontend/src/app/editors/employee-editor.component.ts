import {Component} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {EmployeeExtension, Gender, Roles} from '../entities/employee';
import {EditorBase} from './editor-base';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'sg-employee-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()">
          <header>
              <mat-icon id="sg-editor-icon">account_circle</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              работника {{!isNew ? '№' + this.entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>

                  <sg-employee-search *ngIf="!isFirst()" required
                                      hint="Непосредственный руководитель"
                                      [(ngModel)]="entity.Superior"></sg-employee-search>
                  <sg-subsidiary-search hint="Филиал"
                                        [(ngModel)]="entity.Subsidiary"></sg-subsidiary-search>

                  <mat-form-field>
                      <input matInput placeholder="Имя" required
                             [(ngModel)]="this.entity.Name">
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Фамилия" required
                             [(ngModel)]="this.entity.Surname">
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Отчество" required
                             [(ngModel)]="this.entity.Patronymic">
                  </mat-form-field>

                  <label>Пол:</label>
                  <mat-radio-group required
                          class="sg-vertical-radio-group"
                          aria-label="Выберите пол" [(ngModel)]="this.entity.Gender">
                      <mat-radio-button
                              class="sg-vertical-radio-button"
                              *ngFor="let gender of genders" [value]="gender">
                          {{gender | gender}}
                      </mat-radio-button>
                  </mat-radio-group>

                  <mat-form-field>
                      <input matInput placeholder="Серия и номер паспорта" required
                             [(ngModel)]="this.entity.PassportSerial">
                  </mat-form-field>

                  <mat-form-field>
                      <input matInput placeholder="Адрес" required
                             [(ngModel)]="this.entity.Address">
                  </mat-form-field>
              </mat-card>

              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field>
                      <mat-select [disabled]="isFirst()"
                                  placeholder="Должность" required
                                  [(ngModel)]="entity.Role">
                          <mat-option *ngFor="let role of roles" [value]="role.value">
                              {{role.value | role}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>

                  <mat-form-field>
                      <input matInput placeholder="Имя пользователя" required
                             [(ngModel)]="this.entity.Username">
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

                  <mat-form-field appearance="outline" class="stretch-height">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"
                                [(ngModel)]="this.entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeEditorComponent extends EditorBase<EmployeeExtension, EmployeeService> {
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

  constructor(private service: EmployeeService, route: ActivatedRoute,
              router: Router, dialog: MatDialog) {
    super(service, route, dialog, new EmployeeExtension(), router, 'employees');
  }

  public applyChanges() {
    if ((this.isPasswordChange || this.isNew) && this.password == this.passwordRepeat) {
      this.entity['Password'] = this.password;
      this.entity['PasswordRepeat'] = this.passwordRepeat;
    }
    super.applyChanges();
  }

  public isFirst() {
    return this.entity.Id == 1;
  }
}
