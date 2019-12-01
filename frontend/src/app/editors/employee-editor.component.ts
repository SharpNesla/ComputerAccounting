import {Component} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Employee, Gender, Roles} from "../entities/employee";
import {EditorBase} from "../utils/editor-base";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sg-employee-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/employees">
          <header>
              <mat-icon id="sg-editor-icon">shop</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              Работника {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>

                  <sg-employee-search hint="Непосредственный руководитель"></sg-employee-search>
                  <sg-subsidiary-search hint="Филиал"></sg-subsidiary-search>

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
                          aria-label="Выберите пол" [(ngModel)]="Entity.Gender">
                      <mat-radio-button
                              class="sg-vertical-radio-button"
                              *ngFor="let gender of genders" [value]="gender">
                          {{gender.label}}
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
                  <mat-form-field appearance="outline">

                      <mat-label>Комментарий</mat-label>


                      <textarea matInput placeholder="Комментарий"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeEditorComponent extends EditorBase<Employee, EmployeeService> {
  genders = [
    {label: 'Мужской', value: Gender.Male},
    {label: 'Женский', value: Gender.Female},
    {label: 'Не определён', value: Gender.Unrecognized},

  ];

  roles = [
    {value: Roles.Director},
    {value: Roles.BranchDirector},
    {value: Roles.LeadAdmin},
    {value: Roles.BranchAdmin},
    {value: Roles.Responsible},
    {value: Roles.StoreKeeper},
  ];

  constructor(private service: EmployeeService, route: ActivatedRoute) {
    super(service, route, new Employee());
  }
}
